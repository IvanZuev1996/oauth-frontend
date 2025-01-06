import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import { StackProps } from '../../model/types/stack';

export const HStack: FC<StackProps> = (props) => {
  const { children, className, max = true, ...otherProps } = props;
  return (
    <div
      className={cn('flex items-center gap-2', max && 'w-full', className)}
      {...otherProps}
    >
      {children}
    </div>
  );
};
