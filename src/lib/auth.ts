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
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "MISSING",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "SET" : "MISSING",
  };
  console.error("[auth] Secret resolution failed in production. Available vars:", JSON.stringify(availableVars, null, 2));
  
  // Instead of throwing, generate a temporary secret and log a warning
  // This prevents the entire app from crashing with a 500 error
  const fallbackSecret = crypto.randomBytes(32).toString("hex");
  console.error(
    `[auth] CRITICAL: NEXTAUTH_SECRET is missing in production! ` +
    `Using temporary fallback secret. Please set NEXTAUTH_SECRET in AWS Amplify Console → Environment Variables. ` +
    `Available vars: ${JSON.stringify(availableVars)}`
  );
  return fallbackSecret;
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
          console.warn("[auth] Missing credentials in authorize");
          return null;
        }

        try {
          // Normalize email to lowercase
          const normalizedEmail = credentials.email.toLowerCase().trim();
          
          // Log login attempt (only in development or for debugging)
          if (process.env.NODE_ENV === 'development') {
            console.log("[auth] Login attempt for:", normalizedEmail);
          }
          
          // Direct database validation using Prisma with error handling
          let user;
          try {
            // Check if DATABASE_URL is set
            if (!process.env.DATABASE_URL) {
              console.error("[auth] DATABASE_URL is not set");
              return null;
            }
            
            user = await prisma.user.findUnique({
              where: { email: normalizedEmail }
            });
            
            if (process.env.NODE_ENV === 'development') {
              console.log("[auth] User lookup result:", user ? "Found" : "Not found");
            }
          } catch (dbError) {
            // Database connection error - log with more details
            const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
            console.error("[auth] Database error during authorization:", errorMessage);
            
            // Check for specific error types
            if (errorMessage.includes("Can't reach database server") || 
                errorMessage.includes("Connection") ||
                errorMessage.includes("timeout")) {
              console.error("[auth] Database connection failed. Check DATABASE_URL and RDS security group.");
            } else if (errorMessage.includes("Invalid") || errorMessage.includes("protocol")) {
              console.error("[auth] DATABASE_URL format error. Check connection string format.");
            }
            
            return null;
          }

          if (!user) {
            if (process.env.NODE_ENV === 'development') {
              console.warn("[auth] User not found:", normalizedEmail);
            }
            return null;
          }

          // Verify password
          let isValid = false;
          try {
            isValid = await bcrypt.compare(credentials.password, user.password);
          } catch (bcryptError) {
            console.error("[auth] Password comparison error:", bcryptError);
            return null;
          }
          
          if (!isValid) {
            if (process.env.NODE_ENV === 'development') {
              console.warn("[auth] Invalid password for:", normalizedEmail);
            }
            return null;
          }

          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
          
          if (!userData || !userData.id) {
            console.error("[auth] Invalid user data structure");
            return null;
          }
          
          if (process.env.NODE_ENV === 'development') {
            console.log("[auth] Login successful for:", normalizedEmail);
          }
          
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          } as any;

        } catch (error) {
          // Log error with more context
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error("[auth] Authorization error:", errorMessage);
          
          // Log stack trace in development
          if (process.env.NODE_ENV === 'development' && error instanceof Error) {
            console.error("[auth] Stack trace:", error.stack);
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
  // Ensure NEXTAUTH_URL is available - use NEXT_PUBLIC_BASE_URL as fallback
  // This is set at runtime, not in config, but we ensure it's available
  debug: process.env.NODE_ENV === "development",
};

// Set NEXTAUTH_URL at runtime if missing (NextAuth reads from process.env)
if (!process.env.NEXTAUTH_URL && process.env.NEXT_PUBLIC_BASE_URL) {
  process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_BASE_URL;
  console.info("[auth] Using NEXT_PUBLIC_BASE_URL as NEXTAUTH_URL fallback");
} 