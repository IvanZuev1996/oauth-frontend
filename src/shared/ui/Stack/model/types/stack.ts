import { HTMLAttributes, PropsWithChildren } from 'react';

import { PropsWithClassName } from '@/shared/types/general/general';

export type StackProps = PropsWithChildren &
  PropsWithClassName &
  HTMLAttributes<HTMLDivElement> & {
    max?: boolean;
  };
