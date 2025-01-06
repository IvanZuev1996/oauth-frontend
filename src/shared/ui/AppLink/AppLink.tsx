import Link from 'next/link';
import { FC, ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const AppLink: FC<Props> = (props) => {
  return <Link {...props} prefetch={false} />;
};
