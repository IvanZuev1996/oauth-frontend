import { ChevronDown } from 'lucide-react';
import { FC, useState } from 'react';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { Scopes } from '../../model/types/client';

import './ClientScopes.css';

type Props = {
  scopes: Scopes;
};

export const ClientScopes: FC<Props> = ({ scopes }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <VStack className="gap-1">
      {Object.keys(scopes).map((serviceName, idx) => (
        <VStack
          className="client-scopes__item"
          data-opened={isOpened}
          key={idx}
        >
          <Text className="text-base" weight="medium">
            {serviceName}
          </Text>

          {isOpened &&
            Object.keys(scopes[serviceName]).map((scope) => (
              <Text as="span" className="text-base" key={scope}>
                {scopes[serviceName][scope].title}
              </Text>
            ))}

          <ChevronDown
            size={20}
            onClick={() => setIsOpened(!isOpened)}
            className="client-scopes__item-icon"
          />
        </VStack>
      ))}
    </VStack>
  );
};
