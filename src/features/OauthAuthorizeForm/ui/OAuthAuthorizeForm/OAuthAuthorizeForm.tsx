import Image from 'next/image';
import { FC } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './OAuthAuthorizeForm.css';

type Props = {
  client: ClientWithScopeDetails;
};

export const OAuthAuthorizeForm: FC<Props> = ({ client }) => {
  return (
    <VStack>
      <Image
        src={client.img}
        alt="Логотип приложения"
        width={120}
        height={120}
      />
      <Text as="h1" weight="semibold" className="w-full text-center text-xl">
        Вход с помощью OAuth ID
      </Text>
    </VStack>
  );
};
