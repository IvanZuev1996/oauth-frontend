import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils/cn';

const badgeVariants = cva(
  'items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        default_outline:
          'border-primary dark:border-transparent bg-primary/10 dark:bg-primary text-primary dark:text-primary-foreground',
        success: 'border-transparent  text-primary-foreground  bg-green-500',
        success_outline:
          'border-green-300 dark:border-transparent bg-green-100/50 dark:bg-green-800  dark:text-primary-foreground',
        purple: 'border-transparent  text-primary-foreground  bg-purple-500',
        purple_outline:
          'border-purple-300 dark:border-transparent bg-purple-100/50 dark:bg-purple-500 text-purple-800 dark:text-primary-foreground',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
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
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, textOverflow }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
