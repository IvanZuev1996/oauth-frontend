import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { ScopeListItem } from '../../model/types/scope';

import './CheckedScope.css';

type Props = PropsWithClassName & {
  scope: ScopeListItem;
  isActive: boolean;
  onChange: (scopeKey: string) => void;
};

export const CheckedScope: FC<Props> = (props) => {
  const { scope, isActive, className, onChange } = props;

  return (
    <HStack
      className={cn('checked-scope', className)}
      data-active={isActive}
      onClick={() => onChange(scope.key)}
      key={scope.key}
    >
      <Checkbox
        name={scope.key}
        checked={isActive}
        className="mt-1 rounded-[4px]"
      />
      <VStack className="gap-0">
        <Text as="label">{scope.title}</Text>
        <Text variant="secondary">{scope.key}</Text>
      </VStack>
    </HStack>
  );
};
