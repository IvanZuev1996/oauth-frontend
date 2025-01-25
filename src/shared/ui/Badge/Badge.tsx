import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils/cn';

const badgeVariants = cva(
  'items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        default_outline:
          'border-primary dark:border-transparent bg-primary/10 dark:bg-primary text-primary dark:text-primary-foreground',
        success: 'border-transparent text-primary-foreground  bg-green-500',
        success_outline:
          'border-green-300 dark:border-green-700 bg-green-100/50 dark:bg-green-700/70 dark:text-primary-foreground',
        primary: 'border-transparent text-primary-foreground bg-blue-500',
        primary_outline:
          'border-primary/50 text-primary dark:border-primary bg-blue-100/50 dark:bg-blue-600/70  dark:text-primary-foreground',
        purple: 'border-transparent  text-primary-foreground  bg-purple-500',
        purple_outline:
          'border-purple-300 dark:border-transparent bg-purple-100/50 dark:bg-purple-500 text-purple-800 dark:text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        destructive_outline:
          'border-destructive/60 dark:border-destructive bg-destructive/20 dark:bg-destructive/20 text-red-500',
        outline: 'text-foreground',
      },
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        full: 'rounded-full',
      },
      textOverflow: {
        default: 'inline-flex',
        hidden: 'overflow-hidden text-ellipsis whitespace-nowrap block',
      },
      hover: {
        true: 'hover:opacity-80',
      },
    },

    defaultVariants: {
      variant: 'default',
      rounded: 'sm',
      textOverflow: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  textOverflow = 'default',
  hover = false,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, textOverflow, hover }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
