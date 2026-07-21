import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    message: 'pong',
    time: new Date().toISOString(),
  });
}

export const dynamic = 'force-static';
