import { Ban, CircleAlert, MoveRight } from 'lucide-react';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';

import { Skeleton } from '../Skeleton/Skeleton';
import { HStack, VStack } from '../Stack';
import { Text } from '../Text/Text';

import './Table.css';

type TableProps = PropsWithChildren & {
  header: ReactNode;
};

const Table: FC<TableProps> = ({ header, children }) => {
  return (
    <VStack className="table-wrapper">
      <table className="table">
        <thead>{header}</thead>
        <tbody>{children}</tbody>
      </table>
    </VStack>
  );
};

type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

const TableRow: FC<TableRowProps> = (props) => {
  return (
    <tr
      {...props}
      onClick={props.onClick}
      className={cn(
        'table__row',
        props.className,
        props.onClick && 'cursor-pointer',
      )}
    >
      {props.children}
      {props.onClick && (
        <TableCell className="arrow-cell">
          <div className="table__row__bg"></div>
          <MoveRight size={18} />
        </TableCell>
      )}
    </tr>
  );
};

type TableRowSkeletonProps = HTMLAttributes<HTMLTableRowElement>;

const TableRowSkeleton: FC<TableRowSkeletonProps> = (props) => {
  return (
    <tr {...props} className={cn('w-full', props.className)}>
      <TableCell className="h-[49px] w-full px-1 py-[2px]">
        <Skeleton className="h-full w-full" />
      </TableCell>
    </tr>
  );
};

type TableCellProps = PropsWithClassName & PropsWithChildren;

const TableCell: FC<TableCellProps> = ({ className, children }) => (
  <td className={className}>{children}</td>
);

type EmptyTableRowProps = { text?: string };

const EmptyTableRow: FC<EmptyTableRowProps> = ({ text }) => {
  return (
    <TableRow className="table__row table__row__empty">
      <TableCell>
        <CircleAlert
          className="text-muted-foreground"
          strokeWidth={1.5}
          size={25}
        />
        <Text className="text-muted-foreground" as="span">
          {text || 'Тут ничего нет'}
        </Text>
      </TableCell>
    </TableRow>
  );
};

type TableStatusCellProps = {
  isNegative?: boolean;
  negativeText?: string;
  positiveText?: string;
};

const TableStatusCell: FC<TableStatusCellProps> = ({
  isNegative,
  negativeText,
  positiveText,
}) => (
  <TableCell>
    {isNegative ? (
      <HStack className="text-destructive">
        {negativeText || 'Заблокирован'}
        <Ban size={16} />
      </HStack>
    ) : (
      <Text as="span" className="text-green-600">
        {positiveText || 'Активен'}
      </Text>
    )}
  </TableCell>
);

export {
  Table,
  TableRow,
  TableCell,
  TableStatusCell,
  EmptyTableRow,
  TableRowSkeleton,
};
