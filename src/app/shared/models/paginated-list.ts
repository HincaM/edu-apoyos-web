export interface PaginatedList<T> {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  pagesCount: number;
  hasNextPage: boolean;
  results: T[];
}

export interface PaginationQuery {
  currentPage: number;
  pageSize: number;
}
