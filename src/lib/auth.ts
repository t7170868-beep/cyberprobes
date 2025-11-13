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
  const candidateSecrets = [
    process.env.NEXTAUTH_SECRET,
    process.env.AUTH_SECRET,
    process.env.JWT_SECRET,
  ].filter(Boolean) as string[];

  if (candidateSecrets.length > 0) {
    const resolved = candidateSecrets[0]!.trim();

    if (resolved && resolved !== "your-default-secret-do-not-use-in-production") {
      if (process.env.NODE_ENV === "development") {
        console.info("[auth] Using secret from environment:", candidateSecrets.length > 1 ? "fallback variable" : "NEXTAUTH_SECRET");
      }
      return resolved;
    }
  }

  if (process.env.NODE_ENV === "development") {
    const generated = crypto.randomBytes(32).toString("hex");
    console.warn("[auth] NEXTAUTH_SECRET missing. Generated development secret at runtime.");
    process.env.NEXTAUTH_SECRET = generated;
    return generated;
  }

  // In production, log available env vars for debugging
  const availableVars = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "MISSING",
    AUTH_SECRET: process.env.AUTH_SECRET ? "SET" : "MISSING",
    JWT_SECRET: process.env.JWT_SECRET ? "SET" : "MISSING",
    NODE_ENV: process.env.NODE_ENV || "MISSING",
  };
  console.error("[auth] Secret resolution failed in production. Available vars:", JSON.stringify(availableVars));
  
  throw new Error("NEXTAUTH_SECRET environment variable is required in production. Check Amplify Console → App settings → Environment variables.");
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
          
          // Direct database validation using Prisma with error handling
          let user;
          try {
            user = await prisma.user.findUnique({
              where: { email: normalizedEmail }
            });
          } catch (dbError) {
            // Database connection error - log but don't expose
            if (process.env.NODE_ENV === 'development') {
              console.error("Database error during authorization:", dbError);
            }
            return null;
          }

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
      try {
        if (user) {
          token.role = (user as any).role;
          token.id = user.id;
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add role and id to session from token
      try {
        if (session.user) {
          session.user.role = token.role;
          session.user.id = token.id;
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Session callback error:", error);
        }
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
  // Ensure NEXTAUTH_URL is set for proper callback URLs
  url: process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://main.d1ce8jq8iz0ibb.amplifyapp.com",
}; 