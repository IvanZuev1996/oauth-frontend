'use client';

import { FC } from 'react';

import {
  ClientEmailField,
  ClientNameField,
  ClientRedirectURIField,
  useGetClientDataQuery,
} from '@/entities/Client';
import { ImageUploader } from '@/features/Upload';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { VStack } from '@/shared/ui/Stack';

import { getEditClientFormDataSelector } from '../../model/selectors/editClientFormSelectors';
import {
  editClientFormActions,
  editClientFormReducer,
} from '../../model/slice/editClientFormSlice';

import './EditClientForm.css';

type Props = {
  clientId: string;
};

const reducers: ReducerList = {
  editClientForm: editClientFormReducer,
};

export const EditClientForm: FC<Props> = ({ clientId }) => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(getEditClientFormDataSelector);

  const { data, isLoading, isFetching } = useGetClientDataQuery({ clientId });

  const onChangeField = (value: string, field: keyof typeof formData) => {
    dispatch(
      editClientFormActions.setEditClientFormData({
        ...formData,
        [field]: value,
      }),
    );
  };

  const onReducersMounted = () => {
    if (!data) return;
    dispatch(editClientFormActions.setEditClientFormData(data));
  };

  if (isLoading || isFetching) {
    return null;
  }

  return (
    <DynamicModuleLoader
      reducers={reducers}
      onReducersMounted={onReducersMounted}
    >
      <div className="edit-client-form">
        <VStack className="gap-5 md:min-w-[400px]">
          <ClientNameField name={formData.name} onChange={onChangeField} />
          <ImageUploader
            uploadedImage={formData.img}
            onFileUpload={(path) => onChangeField(path, 'img')}
            onDeleteSuccess={() => onChangeField('', 'img')}
          />
          <ClientRedirectURIField
            redirectUri={formData.redirectUri}
            onChange={onChangeField}
          />
          <ClientEmailField
            email={formData.companyEmail}
            onChange={(value) => onChangeField(value, 'companyEmail')}
          />
        </VStack>

        <VStack className="h-full rounded-md bg-secondary p-5 max-xl:hidden">
          Авторизация
        </VStack>
      </div>
    </DynamicModuleLoader>
  );
};
