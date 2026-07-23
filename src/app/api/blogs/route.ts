import { searchBlogs } from '@/features/blogs/helpers';
import { NextRequest, NextResponse } from 'next/server';
import type { APIResponse, Pagination } from '@/types/api';
import type { BlogSummary } from '@/features/blogs/helpers';
import { blogsSearchParamsSchema } from '@/features/blogs/schemas';

// @export
export function GET(request: NextRequest) {
  const filters = blogsSearchParamsSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));

  if (!filters.success) {
    return NextResponse.json(
      {
        success: false,
        messageDTO: { code: 'M008', message: 'Tham số tìm kiếm không hợp lệ.' },
      } satisfies APIResponse<unknown>,
      { status: 400 },
    );
  }

  const responseBlogs: APIResponse<Pagination<BlogSummary>> = {
    success: true,
    messageDTO: {
      code: 'M001',
      message: 'Success',
    },
    result: searchBlogs(filters.data),
  };

  return NextResponse.json(responseBlogs, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Netlify-CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800, durable',
    }, // 1 day fresh + 7 days stale
  });
}

// @export
export const dynamic = 'force-dynamic';
