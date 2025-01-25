import { useSearchParams } from 'next/navigation';

/**
 * @description Convert search params to default object
 */
export const useAppSearchParams = () => {
  const searchParams = useSearchParams();
  const params = searchParams ? Object.fromEntries(searchParams.entries()) : {};

  return params;
};
