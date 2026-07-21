import { NextResponse } from 'next/server';
import type { APIResponse } from '@/types/api';
import type { Blog } from '@/features/blogs/types';
import { getBlogBySlug, getBlogStaticParams } from '@/features/blogs/helpers';

type BlogRouteContext = {
  params: Promise<{ slug: string }>;
};

// @export
export async function GET(_request: Request, { params }: BlogRouteContext) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

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

  const responseBlog: APIResponse<Blog> = {
    success: true,
    messageDTO: {
      code: 'M001',
      message: 'Success',
    },
    result: blog,
  };
  return NextResponse.json(responseBlog);
}

// @export
export function generateStaticParams() {
  return getBlogStaticParams();
}

// @export
export const dynamic = 'force-static';

// @export
export const dynamicParams = false;
