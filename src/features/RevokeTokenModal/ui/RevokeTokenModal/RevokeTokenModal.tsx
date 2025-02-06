import { FC } from 'react';

import { useRevokeClientTokenMutation } from '@/entities/Token';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import { Alert } from '@/shared/ui/Alert/Alert';
import { Button } from '@/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog/Dialog';
import { Separator } from '@/shared/ui/Separator/Separator';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

type Props = {
  isOpen: boolean;
  clientId: string;
  tokenId: string;
  setIsOpen: (open: boolean) => void;
};

export const RevokeTokenModal: FC<Props> = (props) => {
  const { isOpen, clientId, tokenId, setIsOpen } = props;
  const { toast } = useToast();

  const [revokeToken, { isLoading }] = useRevokeClientTokenMutation();

  const onRevoke = async () => {
    const res = await revokeToken({ clientId, tokenId });
    if (!res || res.error) {
      const err = getErrorToastData(res.error);
      return toast(err);
    }

    setIsOpen(false);
    toast({
      title: 'Токен отозван',
      description:
        'Чтобы восставить доступ приложение должно заново получить OAuth код',
      variant: 'success',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pr-[50px]">
            Вы уверены, что хотите отозвать этот токен?
          </DialogTitle>
        </DialogHeader>

        <Alert variant="warning">
          <Text>
            1. Это OAuth-приложение, больше не сможет получать доступ к системе
          </Text>
          <Separator className="my-2" />
          <Text>
            2. Для восстановления доступа приложению нужно заново получить OAuth
            код
          </Text>
        </Alert>

        <VStack className="mt-3 [&>button]:w-full">
          <Button onClick={onRevoke} size="lg" isLoading={isLoading}>
            Отозвать доступ
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Оставить всё как есть
          </Button>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
