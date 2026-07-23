export type Blog = {
  id: string;
  createdAt: string;
  title: string;
  preview?: string;
  content?: string;
  emojis: number;
  view: boolean;
  userName: string;
  fullname: string;
  categoryName: string;
  slugName: string;
};

export type BlogList = {
  data: Blog[];
};

export type BlogDetailOptions = {
  preview: boolean;
  content: boolean;
};

export const BLOG_SORT_FIELDS = [
  'id',
  'createdAt',
  'title',
  'preview',
  'emojis',
  'view',
  'userName',
  'fullname',
  'categoryName',
  'slugName',
] as const satisfies readonly (keyof Omit<Blog, 'content'>)[];

export type BlogSortField = (typeof BLOG_SORT_FIELDS)[number];

export type BlogsSearchParams = {
  pageNumber: number;
  pageSize: number;
  sortField?: BlogSortField;
  sortOrder?: 'asc' | 'desc';
  title?: string | null;
  category?: string | null;
};
