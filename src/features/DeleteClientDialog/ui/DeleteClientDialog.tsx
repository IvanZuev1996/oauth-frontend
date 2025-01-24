'use client';

import { FC } from 'react';

import { Client, useDeleteClientMutation } from '@/entities/Client';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import { Alert } from '@/shared/ui/Alert/Alert';
import { Button } from '@/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog/Dialog';
import { VStack } from '@/shared/ui/Stack';

type Props = {
  isOpen: boolean;
  clientDetails: Pick<Client, 'name' | 'clientId'>;
  setIsOpen: (open: boolean) => void;
  onDeleteSuccess?: () => void;
};

export const DeleteClientDialog: FC<Props> = (props) => {
  const { clientDetails, isOpen, setIsOpen, onDeleteSuccess } = props;

  const { toast } = useToast();
  const [deleteClient, { isLoading }] = useDeleteClientMutation();

  const onDelete = async () => {
    const res = await deleteClient({ clientId: clientDetails.clientId });
    if (!res || res.error) {
      const err = getErrorToastData(res.error);
      return toast(err);
    }

    onDeleteSuccess?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-tight sm:pr-[70px]">
            Точно хотите удалить приложение «{clientDetails.name}» ?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <VStack>
          <Alert variant="warning" className="text-sm">
            Обратите внимание, все токены выданные приложению станут
            недействительными, приложение будет полностью удалено
          </Alert>

          <VStack className="mt-3 [&>button]:w-full">
            <Button onClick={onDelete} isLoading={isLoading} size="lg">
              Удалить приложение
            </Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Оставить всё как есть
            </Button>
          </VStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
