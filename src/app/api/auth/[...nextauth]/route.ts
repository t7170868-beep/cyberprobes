import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Export as a handler function instead of destructuring
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 