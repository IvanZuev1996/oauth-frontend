import { ErrorResponse } from '@/shared/types/general/general';

/**
 * @description Convert res.error to ErrorResponse type
 */
export const unwrapError = (error: unknown): ErrorResponse | null => {
  if (!error) return null;
  const err = error as ErrorResponse;
  if ('data' in err) return err;
  return null;
};
