import { useSearchParams } from 'next/navigation';

export const useAppSearchParams = () => {
  const searchParams = useSearchParams();
  const params = searchParams ? Object.fromEntries(searchParams.entries()) : {};

  return params;
};
