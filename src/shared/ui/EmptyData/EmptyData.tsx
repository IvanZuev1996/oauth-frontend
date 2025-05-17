import { FC } from 'react';
import { BsFolderX } from 'react-icons/bs';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';

import './EmptyData.css';

interface Props extends PropsWithClassName {
  text?: string;
  bordered?: boolean;
}

export const EmptyData: FC<Props> = ({ text, className, bordered = true }) => {
  return (
    <div
      className={cn(
        'empty-data',
        bordered && 'empty-data__bordered',
        className,
      )}
    >
      <BsFolderX size={20} />
      {text || 'Здесь пока ничего нет'}
    </div>
  );
};
