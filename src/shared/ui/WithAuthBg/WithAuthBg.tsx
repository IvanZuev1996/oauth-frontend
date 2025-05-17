import { FC, PropsWithChildren } from 'react';

import { VStack } from '../Stack';

import './WithAuthBg.css';

type Props = PropsWithChildren;

export const WithAuthBg: FC<Props> = ({ children }) => {
  return (
    <VStack className="with-auth items-center">
      {children}
      <div className="with-auth__bg"></div>
    </VStack>
  );
};
