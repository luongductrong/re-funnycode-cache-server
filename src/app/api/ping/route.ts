import { NextResponse } from 'next/server';

// @export
export function GET() {
  return NextResponse.json({
    message: 'pong',
    time: new Date().toISOString(),
  });
}

// @export
export const dynamic = 'force-static';
