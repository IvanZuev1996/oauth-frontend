'use client';

import { FC } from 'react';

import { Button } from '../Button/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../Dialog/Dialog';

type Props = {
  open: boolean;
  title: string;
  description?: string;
  isLoading?: boolean;
  action: 'delete' | 'add';
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmDialog: FC<Props> = ({
  open,
  onOpenChange,
  title,
  action,
  description,
  onConfirm,
  isLoading,
}) => {
  const onOpenChangeHandler = (open: boolean) => {
    if (isLoading) return;
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description || ''}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Отменить
          </Button>
          {action === 'delete' && (
            <Button
              isLoading={isLoading}
              onClick={onConfirm}
              variant="destructive"
            >
              Удалить
            </Button>
          )}
          {action === 'add' && (
            <Button isLoading={isLoading} onClick={onConfirm}>
              Добавить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
