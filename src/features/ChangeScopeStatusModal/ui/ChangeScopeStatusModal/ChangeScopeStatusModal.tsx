import { FC } from 'react';

import {
  ScopeStatusEnum,
  useUpdateScopeStatusMutation,
} from '@/entities/Scope';
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
  scopeKey: string;
  newStatus: ScopeStatusEnum;
  setIsOpen: (open: boolean) => void;
};

export const ChangeScopeStatusModal: FC<Props> = (props) => {
  const { isOpen, scopeKey, newStatus, setIsOpen } = props;
  const { toast } = useToast();

  const [updateScopeStatus, { isLoading }] = useUpdateScopeStatusMutation();

  const onRevoke = async () => {
    const res = await updateScopeStatus({ scopeKey, status: newStatus });
    if (!res || res.error) {
      const err = getErrorToastData(res.error);
      return toast(err);
    }

    setIsOpen(false);
    toast({
      title: `Доступ ${isRevoked ? 'отозван' : 'восстановлен'}`,
      description: `Приложения ${isRevoked ? 'больше не смогут' : 'смогут'} получать доступ к этому скоупу`,
      variant: 'success',
    });
  };

  const isRevoked = newStatus === ScopeStatusEnum.REVOKED;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pr-[50px]">
            Вы уверены, что хотите {isRevoked ? 'отозвать' : 'восстановить'}{' '}
            доступ к этому «скоупу»?
          </DialogTitle>
        </DialogHeader>

        {isRevoked ? (
          <Alert variant="warning">
            <Text>
              1. Все OAuth-приложения, которые имеют доступ к этому скоупу,
              больше не смогут получать доступ к нему.
            </Text>
            <Separator className="my-2" />
            <Text>
              2. При попытке обратиться к этому скоупу как обычно,
              OAuth-приложения получат ошибку 403 - доступ запрещён.
            </Text>
          </Alert>
        ) : (
          <Alert variant="warning">
            <Text>
              1. Все OAuth-приложения, которые имеют доступ к этому скоупу,
              вновь смогут получать доступ к нему.
            </Text>
          </Alert>
        )}

        <VStack className="mt-3 [&>button]:w-full">
          <Button onClick={onRevoke} size="lg" isLoading={isLoading}>
            {isRevoked ? 'Отозвать доступ' : 'Восстановить доступ'}
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Оставить всё как есть
          </Button>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
