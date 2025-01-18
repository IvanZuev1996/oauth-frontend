import { ClientNameField } from '@/entities/Client';
import { ImageUploader } from '@/features/Upload';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';

import { getCreateClientFormDataSelector } from '../../model/selectors/createClientFormSelectors';
import { createClientFormActions } from '../../model/slice/createClientFormSlice';

export const DefaultClientFormStep = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(getCreateClientFormDataSelector);
  const { serviceName, uploadedImage } = formData;

  const onFileUpload = (path: string) => {
    dispatch(
      createClientFormActions.setCreateClientFormData({
        ...formData,
        uploadedImage: path,
      }),
    );
  };

  const onChangeServiceName = (value: string) => {
    dispatch(
      createClientFormActions.setCreateClientFormData({
        ...formData,
        serviceName: value,
      }),
    );
  };

  const onDeleteSuccess = () => {
    dispatch(
      createClientFormActions.setCreateClientFormData({
        ...formData,
        uploadedImage: '',
      }),
    );
  };

  const onNextStepClick = () => {
    dispatch(createClientFormActions.setNextCreateClientFormStep());
  };

  return (
    <VStack>
      <ClientNameField name={serviceName} onChange={onChangeServiceName} />
      <ImageUploader
        uploadedImage={uploadedImage}
        onFileUpload={onFileUpload}
        onDeleteSuccess={onDeleteSuccess}
      />

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
