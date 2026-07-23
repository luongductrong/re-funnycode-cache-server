import { z } from 'zod';
import { BLOG_SORT_FIELDS } from './types';

const optionalFilterSchema = z.string().trim().min(1).optional();

// @export
export const blogsSearchParamsSchema = z.object({
  pageNumber: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().default(10),
  sortField: z.enum(BLOG_SORT_FIELDS).default('createdAt'),
  sortOrder: z.preprocess(
    (value) => (typeof value === 'string' ? value.toLocaleLowerCase('en') : value),
    z.enum(['asc', 'desc']).default('desc'),
  ),
  title: optionalFilterSchema,
  category: optionalFilterSchema,
});

// @export
export type BlogsSearchParams = z.infer<typeof blogsSearchParamsSchema>;

// @export
export const blogDetailOptionsSchema = z.object({
  preview: z.stringbool().default(false),
  content: z.stringbool().default(true),
});

// @export
export type BlogDetailOptions = z.infer<typeof blogDetailOptionsSchema>;
