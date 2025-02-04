import { FC, PropsWithChildren } from 'react';

import { ClientScopesOptions, scopesOptionsConfig } from '@/entities/Client';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Switch } from '@/shared/ui/Switch/Switch';
import { Text } from '@/shared/ui/Text/Text';

type Props = PropsWithChildren & {
  option: keyof ClientScopesOptions;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const ClientModerationForm: FC<Props> = (props) => {
  const { option, children, checked, onChange } = props;
  const scopeOptions = scopesOptionsConfig[option];

  return (
    <VStack className="gap-1 rounded-sm bg-secondary p-3">
      <HStack>
        <scopeOptions.icon size={18} />
        <Text weight="semibold">{scopeOptions.name}</Text>
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          className="ml-auto"
        />
      </HStack>
      <Text variant="secondary" className="pr-[30px]">
        {scopeOptions.description}
      </Text>

      {children}
    </VStack>
  );
};
