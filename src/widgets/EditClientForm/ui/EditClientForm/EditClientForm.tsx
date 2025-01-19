'use client';

import Link from 'next/link';
import { FC } from 'react';

import {
  ClientEmailField,
  ClientNameField,
  ClientRedirectURIField,
  useGetClientDataQuery,
  useUpdateClientMutation,
} from '@/entities/Client';
import { convertScopesToArray } from '@/entities/Scope';
import { ScopesSearch } from '@/features/ScopesSearch';
import { ImageUploader } from '@/features/Upload';
import { getRouteClientDetails } from '@/shared/const/router';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { cn } from '@/shared/lib/utils/cn';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import { Button, buttonVariants } from '@/shared/ui/Button/Button';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getEditClientFormDataSelector } from '../../model/selectors/editClientFormSelectors';
import {
  editClientFormActions,
  editClientFormReducer,
} from '../../model/slice/editClientFormSlice';
import { EditClientFormData } from '../../model/types/editClientForm';

import './EditClientForm.css';

type Props = {
  clientId: string;
};

const reducers: ReducerList = {
  editClientForm: editClientFormReducer,
};

export const EditClientForm: FC<Props> = ({ clientId }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const formData = useAppSelector(getEditClientFormDataSelector);

  const { data, isLoading, isFetching } = useGetClientDataQuery({ clientId });
  const [updateClient, { isLoading: updateLoading }] =
    useUpdateClientMutation();

  const onUpdateClick = async () => {
    if (!formData) return;
    const res = await updateClient({
      ...formData,
      clientId: clientId,
      scopes: formData.scopes.map((scope) => scope.key),
    });

    if (!res || res.error) {
      const err = getErrorToastData(res.error);
      // return toast(err);
      if (!err.field) return;
      const errorElement = document.getElementById(err.field);
      if (!errorElement) return;
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    window.location.href = getRouteClientDetails(clientId);
  };

  const onChangeField = <T extends keyof EditClientFormData>(
    field: T,
    value: EditClientFormData[T],
  ) => {
    dispatch(
      editClientFormActions.setEditClientFormData({
        ...formData,
        [field]: value,
      }),
    );
  };

  const onReducersMounted = () => {
    if (!data) return;
    dispatch(
      editClientFormActions.setEditClientFormData({
        ...data,
        scopes: convertScopesToArray(data.scopes),
      }),
    );
  };

  if (isLoading || isFetching) {
    return (
      <div className="edit-client-form">
        <Skeleton className="h-[calc(100vh-120px)]" />
        <Skeleton className="h-[calc(100vh-120px)]" />
      </div>
    );
  }

  return (
    <DynamicModuleLoader
      reducers={reducers}
      onReducersMounted={onReducersMounted}
    >
      <div className="edit-client-form">
        <VStack className="edit-client-form__form">
          <Text as="h2" weight="medium" className="text-base">
            Общая информация
          </Text>

          <ClientNameField name={formData.name} onChange={onChangeField} />
          <ImageUploader
            uploadedImage={formData.img}
            onFileUpload={(path) => onChangeField('img', path)}
            onDeleteSuccess={() => onChangeField('img', '')}
          />
          <ScopesSearch
            className="mb-5"
            scopes={formData.scopes}
            onChangeScopes={(scopes) => onChangeField('scopes', scopes)}
          />
          <ClientRedirectURIField
            redirectUri={formData.redirectUri}
            onChange={onChangeField}
          />
          <ClientEmailField
            email={formData.companyEmail}
            onChange={(value) => onChangeField('companyEmail', value)}
          />

          <HStack className="mt-2">
            <Button
              className="w-full"
              onClick={onUpdateClick}
              isLoading={updateLoading}
            >
              Сохранить изменения
            </Button>
            <Link
              href={getRouteClientDetails(clientId)}
              className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
            >
              Отменить
            </Link>
          </HStack>
        </VStack>

        <VStack className="edit-client-form__preview">Авторизация</VStack>
      </div>
    </DynamicModuleLoader>
  );
};
