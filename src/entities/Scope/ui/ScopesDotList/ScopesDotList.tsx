import { FC } from 'react';

import { Scopes } from '@/entities/Client';
import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { convertScopesToArray } from '../../lib/utils/scope';

import './ScopesDotList.css';

export type Props = PropsWithClassName & {
  scopes: Scopes;
};

export const ScopesDotList: FC<Props> = (props) => {
  const scopes = convertScopesToArray(props.scopes);

  return (
    <VStack className={cn('scopes-list', props.className)}>
      {scopes.map((scope, idx) => (
        <Text as="span" key={scope.key + idx}>
          {scope.title}
        </Text>
      ))}
    </VStack>
  );
};
