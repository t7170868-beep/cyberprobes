import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Export as a handler function - NextAuth handles errors internally
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 