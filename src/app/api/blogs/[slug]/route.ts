import type { APIResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';
import { getBlogBySlug } from '@/features/blogs/helpers';
import type { BlogDetail } from '@/features/blogs/helpers';
import { blogDetailOptionsSchema } from '@/features/blogs/schemas';

type BlogRouteContext = {
  params: Promise<{ slug: string }>;
};

// @export
export async function GET(request: NextRequest, { params }: BlogRouteContext) {
  const options = blogDetailOptionsSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));

  if (!options.success) {
    return NextResponse.json(
      {
        success: false,
        messageDTO: { code: 'M008', message: 'Tham số không hợp lệ.' },
      } satisfies APIResponse<unknown>,
      { status: 400 },
    );
  }

  const { slug } = await params;
  const blog = getBlogBySlug(slug, options.data);

  if (!blog) {
    const responseError: APIResponse<unknown> = {
      success: false,
      messageDTO: {
        code: 'M003',
        message: 'Không tìm thấy bài viết.',
      },
    };
    return NextResponse.json(responseError, { status: 404 });
  }

  const responseBlog: APIResponse<BlogDetail> = {
    success: true,
    messageDTO: {
      code: 'M001',
      message: 'Success',
    },
    result: blog,
  };
  return NextResponse.json(responseBlog, {
    headers: {
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=604800',
      'Netlify-CDN-Cache-Control': 'public, max-age=604800, stale-while-revalidate=604800, durable',
    }, // 7 days fresh + 7 days stale
  });
}

// @export
export const dynamic = 'force-dynamic';
