import { NextResponse } from 'next/server';
import type { Blog } from '@/features/blogs/types';
import type { APIResponse, Pagination } from '@/types/api';
import { getBlogSummaries } from '@/features/blogs/helpers';

// @export
export function GET() {
  const blogs = getBlogSummaries();

  const responseBlogs: APIResponse<Pagination<Blog>> = {
    success: true,
    messageDTO: {
      code: 'M001',
      message: 'Success',
    },
    result: {
      paging: {
        currentPage: 1,
        pageSize: blogs.length,
        sort: {
          sortField: 'createdAt',
          sortOrder: 'DESC',
        },
      },
      totalElements: blogs.length,
      totalPages: 1,
      data: blogs,
    },
  };

  return NextResponse.json(responseBlogs);
}

// @export
export const dynamic = 'force-static';
