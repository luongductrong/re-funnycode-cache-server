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
