import { NextResponse } from 'next/server';
import { getBlogBySlug, getBlogStaticParams } from '@/features/blogs/helpers';

type BlogRouteContext = {
  params: Promise<{ slug: string }>;
};

// @export
export async function GET(_request: Request, { params }: BlogRouteContext) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return NextResponse.json({ message: 'Không tìm thấy bài viết.' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// @export
export function generateStaticParams() {
  return getBlogStaticParams();
}

// @export
export const dynamic = 'force-static';

// @export
export const dynamicParams = false;
