import blogsJson from './data/blogs.json';
import type { Blog, BlogList } from './types';

// @export
export type BlogSummary = Omit<Blog, 'content'>;

// @export
export type BlogDetail = Omit<Blog, 'preview'>;

const blogs = (blogsJson as BlogList).data;

// @export
export function getBlogSummaries(): BlogSummary[] {
  return blogs.map(({ content: _, ...blog }) => blog);
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
