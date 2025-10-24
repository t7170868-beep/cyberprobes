export async function GET() {
  const info = {
    execArgv: process.execArgv,
    nodeVersion: process.version,
    envNodeOptions: process.env.NODE_OPTIONS || null,
    pid: process.pid,
  };
  return new Response(JSON.stringify(info, null, 2), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });
}



