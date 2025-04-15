import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Make sure we're exporting GET and POST handlers properly for Next.js App Router
export const GET = NextAuth(authOptions).GET;
export const POST = NextAuth(authOptions).POST; 