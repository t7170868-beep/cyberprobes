import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";

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
          console.log("Missing credentials");
          throw new Error("Email and password are required");
        }

        try {
          // Normalize email to lowercase
          const normalizedEmail = credentials.email.toLowerCase().trim();
          
          // Find user by email
          const user = await prisma.user.findUnique({
            where: {
              email: normalizedEmail
            }
          });

          if (!user) {
            console.log(`No user found for email: ${normalizedEmail}`);
            throw new Error("Invalid credentials");
          }

          if (!user.password) {
            console.log(`User found but no password set for email: ${normalizedEmail}`);
            throw new Error("Account requires password reset");
          }

          try {
            // Compare passwords
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordValid) {
              console.log(`Invalid password for user: ${normalizedEmail}`);
              throw new Error("Invalid credentials");
            }

            console.log(`Login successful for: ${normalizedEmail}, role: ${user.role}`);
            return user;
          } catch (bcryptError) {
            console.error("Password comparison error:", bcryptError);
            throw new Error("Authentication error");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          // Always return a generic error message to avoid security information disclosure
          throw new Error("Invalid credentials");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role and id to token when user logs in
      if (user) {
        token.role = (user as User).role;
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-default-secret-do-not-use-in-production",
}; 