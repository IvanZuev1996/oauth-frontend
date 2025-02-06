'use client';

import { FC } from 'react';

import { Client, useBanClientMutation } from '@/entities/Client';
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
  clientDetails: Pick<Client, 'name' | 'clientId' | 'isBanned'>;
  setIsOpen: (open: boolean) => void;
  onBanSuccess?: () => void;
};

export const BanClientDialog: FC<Props> = (props) => {
  const { clientDetails, isOpen, setIsOpen, onBanSuccess } = props;
  const { toast } = useToast();

  const [banClient, { isLoading }] = useBanClientMutation();

  const onBanHandler = async () => {
    const isBanned = !clientDetails.isBanned;
    const res = await banClient({ clientId: clientDetails.clientId, isBanned });
    if (!res || res.error) {
      const err = getErrorToastData(res.error);
      return toast(err);
    }
    setIsOpen(false);
    onBanSuccess?.();
  };

  const isBanned = clientDetails.isBanned;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-tight sm:pr-[70px]">
            Точно хотите {isBanned ? 'разблокировать' : 'заблокировать'}{' '}
            приложение «{clientDetails.name}» ?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <VStack>
          <Alert variant="warning" className="text-sm">
            {!isBanned
              ? `Обратите внимание, после блокировки все токены станут не
            действительны и приложение потеряет доступ к системе. Вы можете
            разблокировать приложение в любое время - после этого приложению
            нужно будет заново пройти процедуру авторизации`
              : `Обратите внимание, приложение снова сможет получать доступ к системе.
              для этого нужно будет заново пройти процедуру авторизации`}
          </Alert>

          <VStack className="mt-3 [&>button]:w-full">
            <Button onClick={onBanHandler} isLoading={isLoading} size="lg">
              {isBanned ? 'Разблокировать' : 'Заблокировать'} приложение
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
