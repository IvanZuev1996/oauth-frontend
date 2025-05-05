import { Link, Plus } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog/Dialog';
import { Input } from '@/shared/ui/Input/Input';
import { RestMethodSelect } from '@/shared/ui/RestMethodSelect/RestMethodSelect';
import { HStack, VStack } from '@/shared/ui/Stack';

import './CreateProxyRoutesModal.css';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateProxyRoutesModal: FC<Props> = (props) => {
  const { isOpen, onOpenChange } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Добавление маршрутов</DialogTitle>
          <DialogDescription>
            Добавьте маршруты вашего сервера, которые будут использоваться
            клиентами (OAuth-приложениями) и проксироваться через OAuth-сервер.
          </DialogDescription>
        </DialogHeader>

        <VStack>
          <HStack>
            <RestMethodSelect
              value="GET"
              onChange={() => {}}
              className="create-route-form__method"
            />
            <Input className="w-full" placeholder="Название маршрута" />
          </HStack>
          <div className="relative w-full">
            <Link
              size={16}
              className="absolute left-3 top-1/2 z-[20] -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="w-full"
              inputClassName="pl-[40px]"
              placeholder="Полный путь до ендпоинта"
            />
          </div>

          <Button className="ml-auto px-5">
            Добавить <Plus size={16} />
          </Button>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
