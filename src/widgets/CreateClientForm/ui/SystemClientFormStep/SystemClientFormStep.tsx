import {
  ClientEmailField,
  ClientRedirectURIField,
  useCreateClientMutation,
} from '@/entities/Client';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import { timeout } from '@/shared/lib/utils/timeout';
import { Button } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getCreateClientFormDataSelector } from '../../model/selectors/createClientFormSelectors';
import { createClientFormActions } from '../../model/slice/createClientFormSlice';

export const SystemClientFormStep = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const formData = useAppSelector(getCreateClientFormDataSelector);

  const [createClient, { isLoading }] = useCreateClientMutation();

  const onChangeStep = async (type: 'prev' | 'next') => {
    if (type === 'prev') {
      return dispatch(createClientFormActions.setPrevCreateClientFormStep());
    }

    const res = await createClient({
      companyEmail: formData.email,
      name: formData.serviceName,
      scopes: formData.scope,
      redirectUri: formData.redirectUri,
      img: formData.uploadedImage,
    });

    if (!res || res.error) {
      const err = getErrorToastData(res.error);
      return toast(err);
    }

    dispatch(createClientFormActions.setNextCreateClientFormStep());
    await timeout(2000);
    window.location.href = routeConfig.main;
  };

  const onChangeField = (field: string, value: string) => {
    const key = field as keyof typeof formData;

    dispatch(
      createClientFormActions.setCreateClientFormData({
        ...formData,
        [key]: value,
      }),
    );
  };

  return (
    <VStack className="gap-5">
      <Text weight="medium" className="mb-3 text-lg">
        Данные приложения
      </Text>

      <ClientRedirectURIField
        redirectUri={formData.redirectUri}
        onChange={onChangeField}
      />
      <ClientEmailField email={formData.email} onChange={onChangeField} />

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
