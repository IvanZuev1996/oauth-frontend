import { FC, PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Switch } from '@/shared/ui/Switch/Switch';
import { Text } from '@/shared/ui/Text/Text';

import { scopesOptionsConfig } from '../../config/clientScopesConfig';
import { ClientScopesOptions } from '../../model/types/client';

type Props = PropsWithChildren &
  PropsWithClassName & {
    option: keyof ClientScopesOptions;
    checked: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
  };

export const ClientScopeLimit: FC<Props> = (props) => {
  const { option, checked, disabled, className, children, onChange } = props;
  const scopeOptions = scopesOptionsConfig[option];

  return (
    <VStack className={cn('gap-1 rounded-sm bg-secondary p-3', className)}>
      <HStack>
        <scopeOptions.icon size={18} />
        <Text weight="semibold">{scopeOptions.name}</Text>
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          className="ml-auto"
          disabled={disabled}
        />
      </HStack>
      <Text variant="secondary" className="pr-[30px]">
        {scopeOptions.description}
      </Text>

      {children}
    </VStack>
  );
};
