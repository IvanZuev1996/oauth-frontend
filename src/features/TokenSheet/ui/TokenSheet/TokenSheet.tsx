import { Check, TriangleAlert } from 'lucide-react';
import { FC } from 'react';

import { ClientToken } from '@/entities/Token';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { Alert } from '@/shared/ui/Alert/Alert';
import { FieldValue } from '@/shared/ui/FieldValue/FieldValue';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/Sheet/Sheet';
import { HStack, VStack } from '@/shared/ui/Stack';

type Props = {
  isOpen: boolean;
  tokenData: ClientToken;
  setIsOpen: (open: boolean) => void;
};

export const TokensSheet: FC<Props> = (props) => {
  const { isOpen, tokenData, setIsOpen } = props;

  const isTokenRevoked = tokenData.isRevoked;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="xl:min-w-[700px]">
        <SheetHeader>
          <SheetTitle>Информация о токене</SheetTitle>
          <SheetDescription>Общая информация о токене</SheetDescription>
        </SheetHeader>

        <VStack className="mt-5">
          {isTokenRevoked ? (
            <Alert variant="warning" className="text-sm">
              <HStack>
                <TriangleAlert size={18} />
                Этот токен был отозван. Чтобы обновить его, необходимо повторно
                запросить OAuth-код
              </HStack>
            </Alert>
          ) : (
            <Alert variant="success" className="text-sm">
              <HStack>
                <Check size={18} />
                Токен активен
              </HStack>
            </Alert>
          )}

          <FieldValue
            field="ID токена"
            value={tokenData.tokenId}
            variant="grid"
            className="mt-3"
          />
          <FieldValue
            field="Истекает"
            value={formatDate(tokenData.expiresAt)}
            variant="grid"
          />
          <FieldValue
            field="Выданные права (scopes)"
            value={tokenData.scope}
            variant="grid"
            truncate={false}
          />
          {tokenData.client?.name && (
            <FieldValue
              field="Приложение"
              value={tokenData.client.name}
              variant="grid"
            />
          )}
          {tokenData.user?.name && (
            <FieldValue
              field="Юзер"
              value={tokenData.user?.name}
              variant="grid"
            />
          )}
        </VStack>
      </SheetContent>
    </Sheet>
  );
};
