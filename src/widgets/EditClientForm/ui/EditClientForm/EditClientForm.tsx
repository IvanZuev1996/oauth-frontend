'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

import {
  ClientEmailField,
  ClientNameField,
  ClientRedirectURIField,
  useGetClientDataQuery,
  useUpdateClientMutation,
} from '@/entities/Client';
import { convertScopesToArray } from '@/entities/Scope';
import { getUserSelector } from '@/entities/User';
import { OAuthAuthorizeForm } from '@/features/OAuth';
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

  const userData = useAppSelector(getUserSelector);
  const formData = useAppSelector(getEditClientFormDataSelector);

  const [error, setError] = useState<Record<string, string>>();

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
      if (err.field) setError({ [err.field]: 'Недопустимое значение' });
      return toast(err);
    }

    window.location.href = getRouteClientDetails(clientId);
  };

  const onChangeField = <T extends keyof EditClientFormData>(
    field: T,
    value: EditClientFormData[T],
  ) => {
    if (error) setError(undefined);
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

  if (!data || !userData) {
    return null;
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

          <ClientNameField
            name={formData.name}
            onChange={onChangeField}
            error={error?.name}
          />
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
            error={error?.redirectUri}
          />
          <ClientEmailField
            email={formData.companyEmail}
            onChange={(_, value) => onChangeField('companyEmail', value)}
            error={error?.email}
          />

          <HStack className="mt-2 max-sm:flex-col max-sm:[&>button]:w-full">
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

        <VStack className="edit-client-form__preview">
          <VStack className="edit-client-form__preview__form">
            <OAuthAuthorizeForm
              client={{
                ...formData,
                clientId,
              }}
              user={userData}
              readonly
            />
          </VStack>
          <div className="edit-client-form__preview__bg" />
        </VStack>
      </div>
    </DynamicModuleLoader>
  );
};
