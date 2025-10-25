import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

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
          return null;
        }

        try {
          console.log(`🔍 Attempting login for: ${credentials.email}`);

          // Normalize email to lowercase
          const normalizedEmail = credentials.email.toLowerCase().trim();
          
          // Call our API endpoint to validate credentials
          const baseUrl = process.env.NEXTAUTH_URL || 'https://main.d1ce8jq8iz0ibb.amplifyapp.com';
          
          const response = await fetch(`${baseUrl}/api/auth/validate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: normalizedEmail,
              password: credentials.password
            })
          });

          if (!response.ok) {
            console.log(`❌ Authentication failed for: ${normalizedEmail}`);
            return null;
          }

          const userData = await response.json();
          
          if (!userData || !userData.id) {
            console.log(`❌ Invalid user data returned`);
            return null;
          }

          console.log(`✅ Login successful for: ${normalizedEmail}`);
          
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          } as any;

        } catch (error) {
          console.error("❌ Authorization error:", error);
          return null;
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