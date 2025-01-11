import Image from 'next/image';
import { ChangeEvent } from 'react';

import { ImageDeleteButton, ImageUploadButton } from '@/features/Upload';
import { backendUrl } from '@/shared/const/system';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { HStack, VStack } from '@/shared/ui/Stack';

import { getClientFormDataSelector } from '../../model/selectors/clientFormSelectors';
import { clientFormActions } from '../../model/slice/clientFormSlice';

export const DefaultClientFormStep = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(getClientFormDataSelector);
  const { serviceName, uploadedImage } = formData;

  const onFileUpload = (path: string) => {
    dispatch(
      clientFormActions.setClientFormData({
        ...formData,
        uploadedImage: path,
      }),
    );
  };

  const onChangeServiceName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      clientFormActions.setClientFormData({
        ...formData,
        serviceName: e.target.value,
      }),
    );
  };

  const onDeleteSuccess = () => {
    dispatch(
      clientFormActions.setClientFormData({
        ...formData,
        uploadedImage: '',
      }),
    );
  };

  const onNextStepClick = () => {
    dispatch(clientFormActions.setNextClientFormStep());
  };

  return (
    <VStack>
      <InputGroup label="Название Вашего сервиса">
        <Input
          value={serviceName}
          onChange={onChangeServiceName}
          placeholder="Название сервиса"
        />
      </InputGroup>

      <InputGroup label="Иконка сервиса (не более 1МБ)">
        <HStack className="rounded-lg border border-dashed p-5">
          <VStack>
            <ImageUploadButton
              onFileUpload={onFileUpload}
              className={uploadedImage ? 'w-full' : 'w-fit'}
            />
            {uploadedImage && (
              <ImageDeleteButton
                imagePath={uploadedImage}
                onDeleteSuccess={onDeleteSuccess}
                className="w-full"
              />
            )}
          </VStack>
          {uploadedImage && (
            <Image
              src={`${backendUrl}${uploadedImage}`}
              alt="Иконка сервиса"
              width={140}
              height={140}
              className="h-[140px] w-full rounded-lg object-contain"
            />
          )}
        </HStack>
      </InputGroup>

      <VStack className="mt-2">
        <Button
          onClick={onNextStepClick}
          className="w-full"
          disabled={!uploadedImage || !serviceName}
        >
          Сохранить и продолжить
        </Button>
      </VStack>
    </VStack>
  );
};
