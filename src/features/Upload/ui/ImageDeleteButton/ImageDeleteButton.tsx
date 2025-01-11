import { Trash2 } from 'lucide-react';
import { FC } from 'react';

import { PropsWithClassName } from '@/shared/types/general/general';
import { Button } from '@/shared/ui/Button/Button';
import { Loader } from '@/shared/ui/Loader/Loader';

import { useDeleteImageMutation } from '../../api/uploadApi';

type Props = {
  imagePath: string;
  onDeleteSuccess?: () => void;
} & PropsWithClassName;

export const ImageDeleteButton: FC<Props> = (props) => {
  const { imagePath, className, onDeleteSuccess } = props;
  const [deleteImage, { isLoading }] = useDeleteImageMutation();

  const onDeleteClick = async () => {
    const res = await deleteImage({ path: imagePath });
    if (!res || res.error) return;
    onDeleteSuccess?.();
  };

  return (
    <Button variant="destructive" onClick={onDeleteClick} className={className}>
      {isLoading ? <Loader fullWidth={false} /> : <Trash2 size={18} />}
      {isLoading ? 'Загрузка...' : 'Удалить'}
    </Button>
  );
};
