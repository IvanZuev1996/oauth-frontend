import { FC } from 'react';

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
  setIsOpen: (open: boolean) => void;
};

export const RevokeScopeModal: FC<Props> = (props) => {
  const { isOpen, scopeKey, setIsOpen } = props;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pr-[50px]">
            Вы уверены, что хотите отозвать доступ к этому «скоупу»?
          </DialogTitle>
        </DialogHeader>

        <Alert variant="warning" className="text-sm">
          <Text>
            1. Все OAuth-приложения, которые имеют доступ к этому скоупу, больше
            не смогут получать доступ к нему.
          </Text>
          <Separator className="my-2" />
          <Text>
            2. При попытке обратиться к этому скоупу как обычно,
            OAuth-приложения получат ошибку 403 - доступ запрещён.
          </Text>
        </Alert>

        <VStack className="mt-3 [&>button]:w-full">
          <Button onClick={() => {}} size="lg">
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
