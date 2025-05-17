import { Check, Plus } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react';

import {
  convertTTL,
  useCreateScopeMutation,
  Scope,
  CreateScopePayload,
  useUpdateScopeMutation,
} from '@/entities/Scope';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import { timeout } from '@/shared/lib/utils/timeout';
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
import { NumericInput } from '@/shared/ui/NumericInput/NumericInput';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Switch } from '@/shared/ui/Switch/Switch';
import { Text } from '@/shared/ui/Text/Text';

const defaultFormData: CreateScopePayload = {
  name: '',
  requiresApproval: false,
  title: '',
  ttl: 86400,
};

type Props = {
  isOpen: boolean;
  scopeData?: Scope;
  onOpenChange: (open: boolean) => void;
};

export const EditableScopeModal: FC<Props> = (props) => {
  const { isOpen, scopeData, onOpenChange } = props;
  const { toast } = useToast();
  const [formData, setFormData] = useState<CreateScopePayload>(defaultFormData);

  const [updateScope, { isLoading: isLoadingUpdate }] =
    useUpdateScopeMutation();
  const [createScope, { isLoading: isLoadingCreate }] =
    useCreateScopeMutation();

  useEffect(() => {
    if (!scopeData) return;

    setFormData({
      name: scopeData.key,
      requiresApproval: scopeData.requiresApproval,
      title: scopeData.title,
      ttl: scopeData.ttl,
    });
  }, [scopeData]);

  const onOpenChangeHandler = async (open: boolean) => {
    onOpenChange(open);
    if (open) return;
    await timeout(100);
    setFormData(defaultFormData);
  };

  const onChangeFormData = <T extends keyof CreateScopePayload>(
    key: T,
    value: CreateScopePayload[T],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSaveHandler = async () => {
    let res;
    if (scopeData) {
      const { name, ...payload } = formData;
      res = await updateScope({ ...payload, scopeKey: scopeData.key });
    } else {
      res = await createScope({ ...formData });
    }

    if (!res || res.error) {
      return toast(getErrorToastData(res.error));
    }

    return onOpenChangeHandler(false);
  };

  const isLoading = isLoadingUpdate || isLoadingCreate;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChangeHandler}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {scopeData ? 'Редактирование' : 'Создание'} scope (прав доступа)
          </DialogTitle>
          {!scopeData ? (
            <DialogDescription>
              Scope — это разрешение на доступ к определённым данным или
              возможность их изменения на вашем сервере. Создайте необходимые
              права доступа и назначьте их маршрутам, для которых клиент
              (OAuth-приложение) должен обладать соответствующим scope.
            </DialogDescription>
          ) : (
            <DialogDescription></DialogDescription>
          )}
        </DialogHeader>

        <VStack className="gap-4">
          <VStack className="gap-0">
            <Text as="div" weight="medium">
              Название скоупа
            </Text>
            <Text variant="secondary">
              Короткое описание назначения скоупа (права доступа)
            </Text>
            <Input
              value={formData.title}
              onChange={(e) => onChangeFormData('title', e.target.value)}
              className="mt-2 w-full"
              placeholder="Название..."
            />
          </VStack>
          <VStack className="gap-0">
            <Text as="div" weight="medium">
              Ключ
            </Text>
            <Text variant="secondary">
              Короткая запись, определяющая скоуп. Как правило значение вида
              «доступ:вид-доступа». Например, «document:read», «documents:write»
            </Text>
            <Input
              value={formData.name}
              onChange={(e) => onChangeFormData('name', e.target.value)}
              disabled={!!scopeData}
              className="mt-2 w-full"
              placeholder="Ключ скоупа..."
            />
          </VStack>
          <VStack className="gap-0">
            <Text as="div" weight="medium">
              Время жизни токена (в секундах)
            </Text>
            <HStack>
              <Text variant="secondary">
                Время жизни токена авторизации, имеющего данный скоуп
              </Text>
              <Text className="ml-auto" variant="secondary">
                {convertTTL(formData.ttl)}
              </Text>
            </HStack>
            <NumericInput
              value={formData.ttl}
              onChange={(val) => onChangeFormData('ttl', +val)}
              className="mt-2 w-full"
              placeholder="Время жизни токена..."
            />
          </VStack>

          <HStack className="items-start rounded-lg bg-secondary p-3">
            <VStack className="gap-0">
              <Text as="div" weight="medium">
                Сделать этот scope обязательным для пользователя при выдаче
                токена?
              </Text>
              <Text variant="secondary">
                Если включено, пользователь должен будет принять этот scope,
                чтобы приложение получило токен авторизации.
              </Text>
            </VStack>

            <Switch
              size="sm"
              checked={formData.requiresApproval}
              onCheckedChange={(val) =>
                onChangeFormData('requiresApproval', val)
              }
            />
          </HStack>

          <HStack className="mt-2 justify-end">
            <Button
              onClick={() => onOpenChangeHandler(false)}
              variant="secondary"
              className="px-5"
            >
              Отменить
            </Button>
            <Button
              isLoading={isLoading}
              className="px-5"
              disabled={
                !formData.name || !formData.title || !formData.ttl || isLoading
              }
              onClick={onSaveHandler}
            >
              {scopeData ? (
                <>
                  Обновить <Check size={16} />
                </>
              ) : (
                <>
                  Создать <Plus size={16} />
                </>
              )}
            </Button>
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
