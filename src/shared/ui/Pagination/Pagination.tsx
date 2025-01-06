'use client';
import * as React from 'react';

import { cn } from '@/shared/lib/utils/cn';

import { ButtonProps, buttonVariants } from '../Button/Button';

const PaginationNav = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full', className)}
    {...props}
  />
);
PaginationNav.displayName = 'PaginationNav';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

type PaginationItemProps = {
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
} & Pick<ButtonProps, 'size'>;

const PaginationItem = React.memo(
  ({
    className,
    isActive,
    children,
    size = 'icon',
    onClick,
  }: PaginationItemProps) => (
    <li
      onClick={onClick}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
        'cursor-pointer',
      )}
    >
      {children}
    </li>
  ),
);

PaginationItem.displayName = 'PaginationItem';

type PaginationProps = {
  limit: number;
  total: number;
  offset: number;
  className?: string;
  onChange: (p: number) => void;
};

export const Pagination: React.FC<PaginationProps> = React.memo(
  ({ limit, total, offset, onChange, className }) => {
    const count = Math.ceil(total / limit);
    const current =
      offset === 0 ? 1 : count - Math.ceil((total - offset) / limit) + 1;

    const clickHandler = React.useCallback(
      (p: number) => {
        if (current === p) return;

        const isScrollable = document.body.offsetHeight > window.innerHeight;
        if (isScrollable) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        onChange(p);
      },
      [current, onChange],
    );

    if (total <= limit) return null;

    return (
      <PaginationNav className={className}>
        <PaginationContent>
          {count > 1 && (
            <>
              {Array.from({ length: 7 }, (_, i) => current - 3 + i).map(
                (page) => {
                  if (page < 1 || page > count) return null;
                  return (
                    <PaginationItem
                      key={page}
                      isActive={page === current}
                      onClick={() => clickHandler(page)}
                    >
                      {page}
                    </PaginationItem>
                  );
                },
              )}
            </>
          )}
        </PaginationContent>
      </PaginationNav>
    );
  },
);
