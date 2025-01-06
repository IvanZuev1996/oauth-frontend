import { Loader2 } from 'lucide-react';
import React from 'react';

import { cn } from '../../lib/utils/cn';

type Props = {
  size?: number;
  className?: string;
  fullHeight?: boolean;
  flexGrow?: boolean;
  fullWidth?: boolean;
};

export const Loader: React.FC<Props> = ({
  size,
  className,
  fullHeight,
  flexGrow,
  fullWidth = true,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullHeight && 'h-full',
        flexGrow && 'flex-grow',
        fullWidth && 'w-full',
      )}
    >
      <Loader2
        size={size || 30}
        className={cn('animate-spin stroke-primary', className)}
      />
    </div>
  );
};
