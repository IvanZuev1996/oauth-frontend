import { FC } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { ScopesDotList } from '@/entities/Scope';
import { User } from '@/entities/User';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Button } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './OAuthAuthorizeForm.css';

type Props = {
  user: User;
  client: ClientWithScopeDetails;
  onLoginClick?: () => void;
};

export const OAuthAuthorizeForm: FC<Props> = (props) => {
  const { user, client, onLoginClick } = props;

  return (
    <VStack className="items-center">
      <AppImage
        src={client.img}
        alt="Логотип приложения"
        width={96}
        height={96}
        className="aspect-square w-[96px]"
      />
      <Text as="h1" weight="semibold" className="w-full text-center text-xl">
        Вход с помощью OAuth ID
      </Text>

      <VStack>
        <Text>Сервис «{client.name}» получит доступы:</Text>
        <ScopesDotList
          scopes={client.scopes}
          className="max-h-[300px] overflow-y-auto"
        />
      </VStack>

      <Button className="mt-5 w-full py-6 text-base" onClick={onLoginClick}>
        Войти как {user.name}
      </Button>
    </VStack>
  );
};
