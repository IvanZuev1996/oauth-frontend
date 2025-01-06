import { FC, PropsWithChildren, ReactNode } from 'react';

import { VStack } from '../Stack';

import './Table.css';

type Props = PropsWithChildren & {
  header: ReactNode;
  children: ReactNode;
};

export const Table: FC<Props> = ({ header, children }) => {
  return (
    <VStack className="table-ui__wrapper">
      <table className="w-max min-w-full gap-0">
        <thead>{header}</thead>
        <tbody>{children}</tbody>
      </table>
    </VStack>
  );
};
