'use client';

import { FC } from 'react';

import { ScopesDotList } from '@/entities/Scope';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Button } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { useLazyOauthAuthorizeQuery } from '../../api/oauthApi';

import { OAuthAuthorizeFormProps } from './OAuthAuthorizeForm.props';

import './OAuthAuthorizeForm.css';

export const OAuthAuthorizeForm: FC<OAuthAuthorizeFormProps> = (props) => {
  const { user, client, readonly } = props;
  const { toast } = useToast();

  const [authorize, { isLoading, isFetching }] = useLazyOauthAuthorizeQuery();

  const onLoginClick = async () => {
    if (readonly) return;
    const res = await authorize({ ...props.params });

    if (!res || res.error || !res.data) {
      const err = getErrorToastData(res.error);
      return toast(err);
    }

    window.location.href = res.data.url;
  };

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

      <Button
        className="mt-5 w-full py-6 text-base"
        onClick={onLoginClick}
        isLoading={isLoading || isFetching}
      >
        Войти как {user.name}
      </Button>
    </VStack>
  );
};
