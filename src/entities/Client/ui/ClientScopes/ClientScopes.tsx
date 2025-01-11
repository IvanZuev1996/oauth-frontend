import { ChevronDown } from 'lucide-react';
import { FC, useState } from 'react';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './ClientScopes.css';

type Props = {
  scope: string;
};

export const ClientScopes: FC<Props> = ({ scope }) => {
  const [isOpened, setIsOpened] = useState(false);
  const scopes = scope.split(' ');

  return (
    <VStack className="gap-1">
      <VStack
        className="client-scopes__item"
        data-opened={isOpened}
        key={scope}
      >
        <Text className="text-base">Информация о пользователе</Text>

        {isOpened &&
          scopes.map((scope) => (
            <Text as="span" className="text-base" key={scope}>
              {scope}
            </Text>
          ))}

        <ChevronDown
          size={20}
          onClick={() => setIsOpened(!isOpened)}
          className="client-scopes__item-icon"
        />
      </VStack>
    </VStack>
  );
};
