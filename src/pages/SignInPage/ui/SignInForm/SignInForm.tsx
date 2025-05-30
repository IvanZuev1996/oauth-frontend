'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SignInData } from '@/entities/User';
import { useSignInMutation } from '@/entities/User/api/userApi';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { RedirectTargets } from '@/shared/const/router';
import { useAppSearchParams } from '@/shared/lib/hooks/useAppSearchParams/useAppSearchParams';
import { cn } from '@/shared/lib/utils/cn';
import { generateURIWithQueryParams } from '@/shared/lib/utils/links';
import { Button, buttonVariants } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './SignInForm.css';

type SignInFormErrors = Record<keyof SignInData, string | undefined>;
const defaultErrors: SignInFormErrors = {
  loginOrTg: undefined,
  password: undefined,
};

export const SignInForm = () => {
  const queryParams = useAppSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<SignInFormErrors>(defaultErrors);
  const [loginOrTg, setLoginOrTg] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [fetchSingIn, { isSuccess }] = useSignInMutation();

  useEffect(() => {
    if (!isSuccess) return;
    let redirectUrl = routeConfig.main;

    if (queryParams.target === RedirectTargets.OAUTH) {
      redirectUrl = generateURIWithQueryParams(
        routeConfig.oauthAuthorize,
        queryParams,
      );
    }

    window.location.href = redirectUrl;
  }, [isSuccess, queryParams]);

  const onSignIn = async () => {
    const isValid = validateForm(loginOrTg, password);
    if (!isValid) return;

    setIsLoading(true);
    const res = await fetchSingIn({ loginOrTg, password });

    if (!res || res.error) {
      setIsLoading(false);
      setErrors((prev) => ({
        ...prev,
        loginOrTg: 'Неверный логин или пароль',
      }));
    }
  };

  const validateForm = (loginOrTg: string, password: string) => {
    if (!loginOrTg || loginOrTg.length < 3) {
      setErrors((prev) => ({
        ...prev,
        loginOrTg: 'Недопустимое значение',
      }));
      return false;
    }

    if (!password || password.length < 3) {
      setErrors((prev) => ({
        ...prev,
        password: 'Недопустимое значение',
      }));
      return false;
    }

    return true;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === 'loginOrTg') setLoginOrTg(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <VStack className="signin-page__form">
      <Text as="h1" weight="semibold" className="w-full text-center text-xl">
        OAuth 2.0
      </Text>
      <Text variant="secondary" className="w-full text-center">
        Вход в систему OAuth 2.0
      </Text>

      <form action={onSignIn}>
        <InputGroup label="Логин или телеграм">
          <Input
            name="loginOrTg"
            value={loginOrTg}
            onChange={onChangeHandler}
            placeholder="Ваш логин или телеграм"
            error={errors.loginOrTg}
          />
        </InputGroup>

        <InputGroup label="Пароль">
          <Input
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="Пароль от Вашего аккаунта"
            type="password"
            error={errors.password}
          />
        </InputGroup>

        <VStack>
          <Button type="submit" className="mt-2 w-full" isLoading={isLoading}>
            {isLoading ? 'Подождите немного...' : 'Войти'}
          </Button>
          <Link
            href={{
              pathname: routeConfig.signUp,
              query: queryParams,
            }}
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Регистрация <ExternalLink size={18} />
          </Link>
        </VStack>
      </form>
    </VStack>
  );
};
