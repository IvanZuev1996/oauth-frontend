import Image from 'next/image';
import { FC } from 'react';

import { backendUrl } from '@/shared/const/system';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { HStack, VStack } from '@/shared/ui/Stack';

import { ImageDeleteButton } from '../ImageDeleteButton/ImageDeleteButton';
import { ImageUploadButton } from '../ImageUploadButton/ImageUploadButton';

type Props = {
  uploadedImage?: string;
  onFileUpload: (path: string) => void;
  onDeleteSuccess: () => void;
};

export const ImageUploader: FC<Props> = (props) => {
  const { uploadedImage, onDeleteSuccess, onFileUpload } = props;

  return (
    <InputGroup label="Иконка сервиса (не более 1МБ)">
      <HStack className="rounded-lg border border-dashed p-5 max-sm:flex-col-reverse">
        <VStack className="max-sm:mt-3">
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
          <HStack className="justify-center">
            <Image
              src={`${backendUrl}${uploadedImage}`}
              alt="Иконка сервиса"
              width={140}
              height={140}
              className="h-[140px] w-[140px] rounded-lg object-cover"
            />
          </HStack>
        )}
      </HStack>
    </InputGroup>
  );
};
