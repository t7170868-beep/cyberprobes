import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

// Extend the default session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

// We're using SQLite, so we don't need the PrismaAdapter
const resolveSecret = () => {
  const secretFromEnv = process.env.NEXTAUTH_SECRET?.trim();

  if (secretFromEnv && secretFromEnv !== "your-default-secret-do-not-use-in-production") {
    return secretFromEnv;
  }

  if (process.env.NODE_ENV === "development") {
    const generated = crypto.randomBytes(32).toString("hex");
    console.warn("[auth] NEXTAUTH_SECRET missing. Generated development secret at runtime.");
    process.env.NEXTAUTH_SECRET = generated;
    return generated;
  }

  throw new Error("NEXTAUTH_SECRET environment variable is required in production.");
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Normalize email to lowercase
          const normalizedEmail = credentials.email.toLowerCase().trim();
          
          // Direct database validation using Prisma
          const user = await prisma.user.findUnique({
            where: { email: normalizedEmail }
          });

          if (!user) {
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            return null;
          }

          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
          
          if (!userData || !userData.id) {
            return null;
          }
          
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          } as any;

        } catch (error) {
          // Log error but don't expose details
          if (process.env.NODE_ENV === 'development') {
            console.error("Authorization error:", error);
          }
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role and id to token when user logs in
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role and id to session from token
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (reduced from 30 days for better security)
  },
  secret: resolveSecret(),
}; 