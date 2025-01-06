import { FC, PropsWithChildren } from 'react';
import './PageContentLayout.css';

type Props = PropsWithChildren & {
  title: string;
};

export const PageContentLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
};