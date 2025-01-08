import { ErrorResponse } from '@/shared/types/general/general';

export const unwrapError = (error: unknown): ErrorResponse => {
  return error as ErrorResponse;
};
