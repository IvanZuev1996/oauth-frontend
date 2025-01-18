'use client';

import { Paperclip } from 'lucide-react';
import { useRef, FC } from 'react';

import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { cn } from '@/shared/lib/utils/cn';
import { unwrapError } from '@/shared/lib/utils/unwrapError';
import { PropsWithClassName } from '@/shared/types/general/general';
import { Button } from '@/shared/ui/Button/Button';
import { Loader } from '@/shared/ui/Loader/Loader';

import { useUploadImageMutation } from '../../api/uploadApi';
import { validateUploadedImage } from '../../lib/utils/upload';

import './ImageUploadButton.css';

type Props = {
  isUploaded?: boolean;
  onFileUpload: (path: string) => void;
} & PropsWithClassName;

export const ImageUploadButton: FC<Props> = (props) => {
  const { isUploaded, className, onFileUpload } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';

    const { isValid, error } = validateUploadedImage(file);

    if (!isValid) {
      return toast({
        title: 'Ошибка',
        description: error,
        variant: 'destructive',
      });
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadImage(formData);
      if (!response || response.error || !response.data) {
        const err = unwrapError(response.error);
        const message = err
          ? err.data.errors[0].message
          : 'Что-то пошло не так';

        return toast({
          title: 'Ошибка',
          description: message,
        });
      }

      onFileUpload(response.data.path);
    } catch (_) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось загрузить файл',
      });
    }
  };

  const renderUploadText = () => {
    if (isLoading) return 'Загрузка...';
    if (isUploaded) return 'Заменить иконку';
    return 'Прикрепить иконку';
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      <Button
        variant="secondary"
        className={cn('upload-image-btn', className)}
        onClick={() => fileInputRef.current?.click()}
        isLoading={isLoading}
      >
        {isLoading ? <Loader /> : <Paperclip className="h-4 w-4" />}
        {renderUploadText()}
      </Button>
    </>
  );
};
