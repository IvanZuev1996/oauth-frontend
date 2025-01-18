import { ChangeEvent } from 'react';

import { useCreateClientMutation } from '@/entities/Client';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { timeout } from '@/shared/lib/utils/timeout';
import { unwrapError } from '@/shared/lib/utils/unwrapError';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getClientFormDataSelector } from '../../model/selectors/clientFormSelectors';
import { clientFormActions } from '../../model/slice/clientFormSlice';

export const SystemClientFormStep = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const formData = useAppSelector(getClientFormDataSelector);

  const [createClient, { isLoading }] = useCreateClientMutation();

  const onChangeStep = async (type: 'prev' | 'next') => {
    if (type === 'prev') {
      return dispatch(clientFormActions.setPrevClientFormStep());
    }

    const res = await createClient({
      companyEmail: formData.email,
      name: formData.serviceName,
      scopes: formData.scope,
      redirectUri: formData.redirectUri,
      img: formData.uploadedImage,
    });

    if (!res || res.error) {
      const err = unwrapError(res.error);
      const errMessage = err.data.errors[0].message || 'Попробуйте позже';
      return toast({
        title: 'Что-то пошло не так',
        description: errMessage,
        variant: 'destructive',
      });
    }

    dispatch(clientFormActions.setNextClientFormStep());
    await timeout(2000);
    window.location.href = routeConfig.main;
  };

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof typeof formData;

    dispatch(
      clientFormActions.setClientFormData({
        ...formData,
        [key]: value,
      }),
    );
  };

  return (
    <VStack>
      <Text weight="medium" className="mb-3 text-lg">
        Данные приложения
      </Text>
      <InputGroup
        label="Redirect URI"
        description="Адрес страницы, куда направим пользователя после того, как он разрешил или отказал приложению в доступе"
      >
        <Input
          name="redirectUri"
          value={formData.redirectUri}
          onChange={onChangeField}
          placeholder="https://example.com/verification_code"
        />
      </InputGroup>

      <InputGroup
        label="Email"
        description="Укажите почту компании или свою. Будем оповещать об изменениях во внешней авторизации"
      >
        <Input
          name="email"
          value={formData.email}
          onChange={onChangeField}
          placeholder="company@mail.ru"
        />
      </InputGroup>

      <VStack className="mt-3">
        <Button
          className="w-full"
          disabled={!formData.email || !formData.redirectUri}
          onClick={() => onChangeStep('next')}
          isLoading={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить и продолжить'}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onChangeStep('prev')}
          disabled={isLoading}
        >
          Вернуться назад
        </Button>
      </VStack>
    </VStack>
  );
};
