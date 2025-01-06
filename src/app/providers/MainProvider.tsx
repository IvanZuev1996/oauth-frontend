import { FC, PropsWithChildren } from 'react';

import { StoreProvider } from './StoreProvider';

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};
