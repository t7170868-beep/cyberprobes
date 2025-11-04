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
          
          // Direct database validation using Prisma
          const bcrypt = require('bcrypt');
          const user = await prisma.user.findUnique({
            where: { email: normalizedEmail }
          });

          if (!user) {
            console.log(`❌ User not found: ${normalizedEmail}`);
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            console.log(`❌ Invalid password for: ${normalizedEmail}`);
            return null;
          }

          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
          
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