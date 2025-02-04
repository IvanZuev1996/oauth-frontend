export interface PropsWithClassName {
  className?: string;
}
export interface DataWithCounting<T> {
  count: number;
  rows: T[];
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export type SortType = 'asc' | 'desc';

export interface ErrorResponse {
  status: number;
  data: { errors: { property: string; message: string }[] };
}

export type FromToOptions = {
  from: number;
  to: number;
};
