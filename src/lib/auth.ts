import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import { MongoClient } from "mongodb";

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

        let mongoClient: MongoClient | null = null;

        try {
          // Normalize email to lowercase
          const normalizedEmail = credentials.email.toLowerCase().trim();
          
          console.log(`🔍 Attempting login for: ${normalizedEmail}`);

          // Try Prisma first
          try {
            const user = await prisma.user.findUnique({
              where: { email: normalizedEmail }
            });

            if (user && user.password) {
              const isPasswordValid = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if (isPasswordValid) {
                console.log(`✅ Prisma login successful for: ${normalizedEmail}`);
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  role: user.role
                } as any;
              }
            }
          } catch (prismaError) {
            console.log(`⚠️  Prisma failed, trying direct MongoDB:`, prismaError);
          }

          // Fallback to direct MongoDB connection
          if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL not configured");
          }

          console.log(`🔌 Connecting to MongoDB directly...`);
          mongoClient = new MongoClient(process.env.DATABASE_URL);
          await mongoClient.connect();
          
          const db = mongoClient.db('cyberprobes');
          const usersCollection = db.collection('User');
          
          const user = await usersCollection.findOne({ email: normalizedEmail });

          if (!user) {
            console.log(`❌ No user found for: ${normalizedEmail}`);
            throw new Error("Invalid credentials");
          }

          if (!user.password) {
            console.log(`❌ No password set for: ${normalizedEmail}`);
            throw new Error("Account requires password reset");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log(`❌ Invalid password for: ${normalizedEmail}`);
            throw new Error("Invalid credentials");
          }

          console.log(`✅ MongoDB login successful for: ${normalizedEmail}`);
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          } as any;

        } catch (error) {
          console.error("❌ Authorization error:", error);
          throw new Error("Invalid credentials");
        } finally {
          if (mongoClient) {
            await mongoClient.close().catch(() => {});
          }
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