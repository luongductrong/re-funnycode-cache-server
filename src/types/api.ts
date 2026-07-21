export type APIResponse<T> = {
  success: boolean;
  messageDTO: {
    code: string;
    message: string;
  };
  result?: T;
};

export type Pagination<T> = {
  paging: {
    currentPage: number;
    pageSize: number;
    sort: {
      sortField: string | null;
      sortOrder: string | null;
    };
  };
  totalElements: number;
  totalPages: number;
  data: T[];
};
