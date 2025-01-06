import { Skeleton } from '../Skeleton/Skeleton';

type Props = {
  login?: string | null;
  isLoading?: boolean;
};

export const Avatar: React.FC<Props> = ({ login, isLoading }) => {
  if (isLoading || !login) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  return (
    <div className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary font-medium uppercase text-background">
      {login[0]}
    </div>
  );
};
