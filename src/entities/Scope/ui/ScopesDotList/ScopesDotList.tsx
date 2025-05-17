import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { ScopeShortData } from '../../model/types/scope';

import './ScopesDotList.css';

export type Props = PropsWithClassName & {
  scopes: ScopeShortData[];
};

export const ScopesDotList: FC<Props> = ({ scopes, className }) => {
  return (
    <VStack className={cn('scopes-list', className)}>
      {scopes.map((scope, idx) => (
        <Text as="span" key={scope.key + idx}>
          {scope.title}
        </Text>
      ))}
    </VStack>
  );
};
