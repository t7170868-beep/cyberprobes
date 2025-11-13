import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

// Export as a handler function with error handling
let handler: ReturnType<typeof NextAuth>;

try {
  handler = NextAuth(authOptions);
} catch (error) {
  console.error("[NextAuth] Initialization error:", error);
  
  // Return a fallback handler that provides clear error messages
  handler = async (req: any, res: any) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[NextAuth] Handler error:", errorMessage);
    
    // Check which environment variables are missing
    const missingVars = [];
    if (!process.env.NEXTAUTH_SECRET && !process.env.AUTH_SECRET && !process.env.JWT_SECRET) {
      missingVars.push("NEXTAUTH_SECRET (or AUTH_SECRET or JWT_SECRET)");
    }
    if (!process.env.DATABASE_URL) {
      missingVars.push("DATABASE_URL");
    }
    if (!process.env.NEXTAUTH_URL && !process.env.NEXT_PUBLIC_BASE_URL) {
      missingVars.push("NEXTAUTH_URL (or NEXT_PUBLIC_BASE_URL)");
    }
    
    return NextResponse.json(
      {
        error: "Authentication configuration error",
        message: errorMessage,
        missingVariables: missingVars,
        hint: "Please check AWS Amplify Console → Environment Variables",
      },
      { status: 500 }
    );
  } as any;
}

export { handler as GET, handler as POST }; 