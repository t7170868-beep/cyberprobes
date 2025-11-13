import { NextResponse } from 'next/server';

export async function GET() {
  const keys = Object.keys(process.env)
    .filter((key) =>
      key.startsWith('NEXTAUTH') ||
      key.startsWith('AUTH') ||
      key.startsWith('JWT') ||
      key.startsWith('DATABASE') ||
      key.startsWith('NEXT_PUBLIC') ||
      key === 'NODE_ENV'
    )
    .sort();

  const summary = Object.fromEntries(
    keys.map((key) => {
      const value = process.env[key];
      if (!value) return [key, 'MISSING'];
      // For sensitive values, show only first/last few chars
      if (key.includes('SECRET') || key.includes('DATABASE_URL') || key.includes('JWT')) {
        return [key, `SET (${value.length} chars, starts with: ${value.substring(0, 10)}...)`];
      }
      return [key, `SET: ${value}`];
    })
  );

  // Check critical variables
  const criticalVars = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'MISSING',
    JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'MISSING',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'MISSING',
  };

  const allSet = Object.values(criticalVars).every(v => v === 'SET' || (v === 'production'));

  return NextResponse.json({
    status: allSet ? 'OK' : 'ERROR',
    criticalVariables: criticalVars,
    runtimeEnvSummary: summary,
    allKeysCount: keys.length,
    message: allSet 
      ? 'All critical environment variables are set'
      : 'Some critical environment variables are missing. Check AWS Amplify Console → Environment Variables',
  });
}

