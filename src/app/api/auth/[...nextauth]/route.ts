import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Initialize NextAuth handler with error handling
let handler: ReturnType<typeof NextAuth>;

try {
  handler = NextAuth(authOptions);
} catch (error) {
  console.error("[NextAuth] Initialization error:", error);
  
  // Create a fallback handler that provides clear error messages
  const createErrorHandler = (initError: unknown) => {
    return async (req: NextRequest) => {
      const errorMessage = initError instanceof Error ? initError.message : "Unknown error";
      console.error("[NextAuth] Handler error:", errorMessage);
      
      // Check which environment variables are missing
      const missingVars: string[] = [];
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
    };
  };
  
  handler = createErrorHandler(error) as any;
}

// Wrap handlers with error catching to prevent unhandled errors
// NextAuth handlers have signature: (req: NextRequest, context: { params: Promise<{ catchall: string[] }> })
const wrapHandler = (handlerFn: any) => {
  return async (req: NextRequest, context: any) => {
    try {
      const result = await handlerFn(req, context);
      return result;
    } catch (error) {
      console.error("[NextAuth] Runtime error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      // Check if it's a database connection error
      if (errorMessage.includes("PrismaClient") || errorMessage.includes("database") || errorMessage.includes("connection")) {
        return NextResponse.json(
          {
            error: "Database connection error",
            message: "Unable to connect to database. Please check DATABASE_URL configuration.",
            hint: "Please check AWS Amplify Console → Environment Variables → DATABASE_URL",
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        {
          error: "Authentication service error",
          message: process.env.NODE_ENV === "development" ? errorMessage : "An error occurred during authentication",
          hint: "Please check server logs for details",
        },
        { status: 500 }
      );
    }
  };
};

export const GET = wrapHandler(handler);
export const POST = wrapHandler(handler); 