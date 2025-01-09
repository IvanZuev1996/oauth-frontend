import Image from 'next/image';
import { useState } from 'react';

import { ImageUploadButton } from '@/features/ImageUploadButton';
import { backendUrl } from '@/shared/const/system';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { VStack } from '@/shared/ui/Stack';

export const DefaultClientFormStep = () => {
  const [uploadedImage, setUploadedImage] = useState<string>();

  const onFileUpload = (path: string) => {
    setUploadedImage(path);
  };

  return (
    <VStack>
      <InputGroup label="Название Вашего сервиса">
        <Input placeholder="Название сервиса" />
      </InputGroup>

      <InputGroup label="Иконка сервиса (не более 1МБ)">
        <ImageUploadButton onFileUpload={onFileUpload} className="w-fit" />
        {uploadedImage && (
          <Image
            src={`${backendUrl}${uploadedImage}`}
            alt="Иконка сервиса"
            width={300}
            height={300}
            className="h-[200px] w-full rounded-lg object-cover"
          />
        )}
      </InputGroup>

      <VStack>
        <Button>Сохранить и продолжить</Button>
      </VStack>
    </VStack>
  );
};
