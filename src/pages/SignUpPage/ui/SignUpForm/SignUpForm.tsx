'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SignUpData } from '@/entities/User';
import { useSignUpMutation } from '@/entities/User/api/userApi';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { RedirectTargets } from '@/shared/const/router';
import { useAppSearchParams } from '@/shared/lib/hooks/useAppSearchParams/useAppSearchParams';
import { cn } from '@/shared/lib/utils/cn';
import { isEmail } from '@/shared/lib/utils/isEmail';
import { generateURIWithQueryParams } from '@/shared/lib/utils/links';
import { unwrapError } from '@/shared/lib/utils/unwrapError';
import { Button, buttonVariants } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './SignUpForm.css';

type SignUpFormErrors = Partial<Record<keyof SignUpData, string | undefined>>;
const defaultSignUpData: SignUpData = {
  email: '',
  login: '',
  name: '',
  password: '',
  telegram: '',
};

export const SignUpForm = () => {
  const queryParams = useAppSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<SignUpFormErrors>();
  const [data, setData] = useState<SignUpData>(defaultSignUpData);
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');

  const [fetchSingUp, { error, isSuccess }] = useSignUpMutation();

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

  const onSignUp = async () => {
    const isValid = validateForm(data);
    if (!isValid) return;

    setIsLoading(true);
    const res = await fetchSingUp(data);

    if (!res || res.error) {
      const err = unwrapError(error);
      if (err) {
        err.data.errors.forEach((fieldError) => {
          if (fieldError) {
            setFieldError(
              fieldError.property as keyof SignUpData,
              fieldError.message,
            );
          }
        });
      }
      setIsLoading(false);
    }
  };

  const validateForm = (data: SignUpData) => {
    const { email, login, name, password, telegram } = data;

    if (password !== repeatedPassword) {
      return setFieldError('password', 'Пароли не совпадают');
    }

    if (!name || name.length < 3) {
      return setFieldError('name');
    }

    if (!login || login.length < 3) {
      return setFieldError('login');
    }

    if (!telegram || telegram.length < 3) {
      return setFieldError('telegram');
    }

    if (!email || !isEmail(email)) {
      return setFieldError('email');
    }

    if (!password || password.length < 3) {
      return setFieldError('password');
    }

    return true;
  };

  const setFieldError = (
    field: keyof SignUpData,
    message: string = 'Недопустимое значение',
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
    return false;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));

    const field = name as keyof SignUpData;
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <VStack className="signin-page__form">
      <Text as="h1" weight="semibold" className="w-full text-center text-xl">
        OAuth 2.0
      </Text>
      <Text variant="secondary" className="w-full text-center">
        Вход в систему OAuth 2.0
      </Text>

      <form action={onSignUp}>
        <InputGroup label="Ваше имя">
          <Input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Введите имя"
            error={errors?.name}
          />
        </InputGroup>

        <InputGroup label="Логин">
          <Input
            name="login"
            value={data.login}
            onChange={onChangeHandler}
            placeholder="Придумайте логин"
            error={errors?.login}
          />
        </InputGroup>

        <InputGroup label="Телеграм">
          <Input
            name="telegram"
            value={data.telegram}
            onChange={onChangeHandler}
            placeholder="Введите ваш телеграм"
            error={errors?.telegram}
          />
        </InputGroup>

        <InputGroup label="Email">
          <Input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Введите ваш Email"
            error={errors?.email}
          />
        </InputGroup>

        <InputGroup label="Пароль">
          <Input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Придумайте пароль"
            type="password"
            error={errors?.password}
          />
        </InputGroup>

        <InputGroup label="Повторите пароль">
          <Input
            name="password"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
            placeholder="Повторите пароль"
            type="password"
          />
        </InputGroup>

        <VStack>
          <Button type="submit" className="mt-2 w-full" isLoading={isLoading}>
            {isLoading ? 'Подождите немного...' : 'Зарегистрироваться'}
          </Button>
          <Link
            href={{
              pathname: routeConfig.signIn,
              query: queryParams,
            }}
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Уже есть аккаунт? <ExternalLink size={18} />
          </Link>
        </VStack>
      </form>
    </VStack>
  );
};
