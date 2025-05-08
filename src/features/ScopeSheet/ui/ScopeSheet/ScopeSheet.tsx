import { Check, TriangleAlert } from 'lucide-react';
import { FC } from 'react';

import {
  convertTTL,
  ScopeStatusEnum,
  useGetScopeQuery,
} from '@/entities/Scope';
import { formatWord } from '@/shared/lib/utils/formatWord';
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
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';

type Props = {
  isOpen: boolean;
  scopeKey: string;
  setIsOpen: (open: boolean) => void;
};

export const ScopeSheet: FC<Props> = (props) => {
  const { isOpen, scopeKey, setIsOpen } = props;

  const { data, isLoading, isFetching } = useGetScopeQuery(
    { scopeKey },
    { refetchOnMountOrArgChange: true },
  );

  const formOauthAppText = (clientCount: number) => {
    const text = 'Данный доступ в данный момент имеют';
    const oauthAppText = formatWord(clientCount, [
      'OAuth-приложение',
      'OAuth-приложения',
      'OAuth-приложений',
    ]);

    return text + ' ' + oauthAppText;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="xl:min-w-[700px]">
        <SheetHeader>
          <SheetTitle>Информация о доступе</SheetTitle>
          <SheetDescription>
            {data?.clientsCount ? `${formOauthAppText(data.clientsCount)}` : ''}
          </SheetDescription>
        </SheetHeader>

        {isLoading || isFetching || !data ? (
          <VStack className="mt-5">
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[180px] w-full" />
          </VStack>
        ) : (
          <VStack className="mt-5">
            {data.status === ScopeStatusEnum.REVOKED ? (
              <Alert variant="warning" className="text-sm">
                <HStack>
                  <TriangleAlert size={18} />
                  Этот скоуп был отозван
                </HStack>
              </Alert>
            ) : (
              <Alert variant="success" className="text-sm">
                <HStack>
                  <Check size={18} />
                  Скоуп активен, OAuth-приложения могут обращаться к нему
                </HStack>
              </Alert>
            )}

            <FieldValue
              field="Ключ"
              value={data.key}
              variant="grid"
              className="mt-3"
            />
            <FieldValue field="Название" value={data.title} variant="grid" />
            <FieldValue
              field="Возможность обновления"
              value={data.isTtlRefreshable ? 'Да' : 'Нет'}
              variant="grid"
            />
            <FieldValue
              field="Время жизни"
              value={`${convertTTL(data.ttl)} мин.`}
              variant="grid"
            />
            <FieldValue
              field="Обязательное подтверждение"
              value={data.requiresApproval ? 'Да' : 'Нет'}
              variant="grid"
            />
            {data.service && (
              <FieldValue
                field="Сервис"
                value={data.service.name}
                variant="grid"
              />
            )}
          </VStack>
        )}
      </SheetContent>
    </Sheet>
  );
};
