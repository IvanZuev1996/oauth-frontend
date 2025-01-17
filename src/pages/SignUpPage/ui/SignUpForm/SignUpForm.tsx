'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SignUpData } from '@/entities/User';
import { useSignUpMutation } from '@/entities/User/api/userApi';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { cn } from '@/shared/lib/utils/cn';
import { isEmail } from '@/shared/lib/utils/isEmail';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<SignUpFormErrors>();
  const [data, setData] = useState<SignUpData>(defaultSignUpData);
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');

  const [fetchSingUp, { error, isSuccess }] = useSignUpMutation();

  useEffect(() => {
    if (error) {
      const { data } = unwrapError(error);
      data.errors.forEach((fieldError) => {
        if (fieldError) {
          setFieldError(
            fieldError.property as keyof SignUpData,
            fieldError.message,
          );
        }
      });
      setIsLoading(false);
      return;
    }

    if (isSuccess) {
      window.location.href = routeConfig.main;
      setIsLoading(false);
    }
  }, [error, isSuccess]);

  const onSignUp = async () => {
    const isValid = validateForm(data);
    if (!isValid) return;

    setIsLoading(true);
    fetchSingUp(data);
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
        <InputGroup label="Ваше имя" error={errors?.name}>
          <Input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Введите имя"
          />
        </InputGroup>

        <InputGroup label="Логин" error={errors?.login}>
          <Input
            name="login"
            value={data.login}
            onChange={onChangeHandler}
            placeholder="Придумайте логин"
          />
        </InputGroup>

        <InputGroup label="Телеграм" error={errors?.telegram}>
          <Input
            name="telegram"
            value={data.telegram}
            onChange={onChangeHandler}
            placeholder="Введите ваш телеграм"
          />
        </InputGroup>

        <InputGroup label="Email" error={errors?.email}>
          <Input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Введите ваш Email"
          />
        </InputGroup>

        <InputGroup label="Пароль" error={errors?.password}>
          <Input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Придумайте пароль"
            type="password"
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
            href={routeConfig.signIn}
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Уже есть аккаунт? <ExternalLink size={18} />
          </Link>
        </VStack>
      </form>
    </VStack>
  );
};
