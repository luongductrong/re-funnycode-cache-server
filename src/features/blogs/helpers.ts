import blogsJson from './data/blogs.json';
import type { Pagination } from '@/types/api';
import type { Blog, BlogList, BlogSortField, BlogsSearchParams } from './types';

// @export
export type BlogSummary = Omit<Blog, 'content'>;

// @export
export type BlogDetail = Omit<Blog, 'preview'>;

const blogs = (blogsJson as BlogList).data;

const DEFAULT_SORT_FIELD: BlogSortField = 'createdAt';
const DEFAULT_SORT_ORDER: NonNullable<BlogsSearchParams['sortOrder']> = 'desc';

function normalizeSearchValue(value?: string | null) {
  return value?.trim().toLocaleLowerCase('vi') ?? '';
}

function compareBlogValues(left: BlogSummary[BlogSortField], right: BlogSummary[BlogSortField]) {
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  if (typeof left === 'boolean' && typeof right === 'boolean') return Number(left) - Number(right);

  return String(left ?? '').localeCompare(String(right ?? ''), 'vi', {
    numeric: true,
    sensitivity: 'base',
  });
}

// @export
export function getBlogSummaries(): BlogSummary[] {
  return blogs.map(({ content: _, ...blog }) => blog);
}

// @export
export function searchBlogs(params: BlogsSearchParams): Pagination<BlogSummary> {
  const title = normalizeSearchValue(params.title);
  const category = normalizeSearchValue(params.category);
  const sortField = params.sortField ?? DEFAULT_SORT_FIELD;
  const sortOrder = params.sortOrder ?? DEFAULT_SORT_ORDER;

  const filteredBlogs = getBlogSummaries().filter((blog) => {
    const matchesTitle = !title || normalizeSearchValue(blog.title).includes(title);
    const matchesCategory = !category || normalizeSearchValue(blog.categoryName) === category;
    return matchesTitle && matchesCategory;
  });

  filteredBlogs.sort((left, right) => {
    const comparison = compareBlogValues(left[sortField], right[sortField]);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalElements = filteredBlogs.length;
  const totalPages = Math.ceil(totalElements / params.pageSize);
  const startIndex = (params.pageNumber - 1) * params.pageSize;
  const data = filteredBlogs.slice(startIndex, startIndex + params.pageSize);

  return {
    paging: {
      currentPage: params.pageNumber,
      pageSize: params.pageSize,
      sort: {
        sortField,
        sortOrder: sortOrder.toUpperCase(),
      },
    },
    totalElements,
    totalPages,
    data,
  };
}

// @export
export function getBlogBySlug(slug: string): BlogDetail | undefined {
  const blog = blogs.find(({ slugName }) => slugName === slug);

  if (!blog) return undefined;

  const { preview: _preview, ...detail } = blog;
  return detail;
}

// @export
export function getBlogStaticParams() {
  return blogs.map(({ slugName }) => ({ slug: slugName }));
}
