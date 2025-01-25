import { FC } from 'react';

import { Scope } from '@/entities/Scope';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/Sheet/Sheet';
import { VStack } from '@/shared/ui/Stack';

type Props = {
  isOpen: boolean;
  scopeData: Scope;
  setIsOpen: (open: boolean) => void;
};

export const ScopeSheet: FC<Props> = (props) => {
  const { isOpen, scopeData, setIsOpen } = props;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Информация о доступе</SheetTitle>
          <SheetDescription>
            Данный доступ в данный момент имеют 20 OAuth-приложений.
          </SheetDescription>
        </SheetHeader>

        <VStack>Тут инфа о доступе</VStack>
      </SheetContent>
    </Sheet>
  );
};
