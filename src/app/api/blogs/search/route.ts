import { NextResponse } from 'next/server';
import { getBlogSummaries } from '@/features/blogs/helpers';

// @export
export function GET() {
  return NextResponse.json(getBlogSummaries());
}

// @export
export const dynamic = 'force-static';
