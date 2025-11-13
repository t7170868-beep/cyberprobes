import { NextResponse } from 'next/server';

export async function GET() {
  const keys = Object.keys(process.env)
    .filter((key) =>
      key.startsWith('NEXTAUTH') ||
      key.startsWith('AUTH') ||
      key.startsWith('JWT') ||
      key === 'NODE_ENV'
    )
    .sort();

  const summary = Object.fromEntries(
    keys.map((key) => [key, process.env[key] ? 'SET' : 'undefined'])
  );

  return NextResponse.json({
    runtimeEnvSummary: summary,
    allKeysCount: keys.length,
  });
}

