import { Check, Link, Plus, Trash2 } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

import {
  useCreateProxyRoutesMutation,
  CreateProxyRoutePayload,
  ProxyRoute,
  useUpdateProxyRouteMutation,
  useDeleteProxyRouteMutation,
} from '@/entities/ProxyRoute';
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
import { RestMethodSelect } from '@/shared/ui/RestMethodSelect/RestMethodSelect';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { EditableProxyRouteScopes } from '../EditableProxyRouteScopes/EditableProxyRouteScopes';

import './EditableProxyRouteModal.css';

const defaultFormData: CreateProxyRoutePayload = {
  method: 'GET',
  externalPath: '',
  externalHost: '',
  name: '',
};

type Props = {
  isOpen: boolean;
  existData?: ProxyRoute;
  onOpenChange: (open: boolean) => void;
};

export const EditableProxyRouteModal: FC<Props> = (props) => {
  const { isOpen, existData, onOpenChange } = props;
  const { toast } = useToast();
  const [formData, setFormData] =
    useState<CreateProxyRoutePayload>(defaultFormData);

  const [deleteProxyRoute, { isLoading: isDeleteLoading }] =
    useDeleteProxyRouteMutation();
  const [createProxyRoute, { isLoading: isCreateLoading }] =
    useCreateProxyRoutesMutation();
  const [updateProxyRoute, { isLoading: isUpdateLoading }] =
    useUpdateProxyRouteMutation();

  useEffect(() => {
    if (!existData) return;
    setFormData({
      externalPath: existData.externalPath,
      externalHost: existData.externalHost,
      method: existData.method,
      name: existData.name,
      scopes: existData.scopes,
    });
  }, [existData]);

  const onChangeForm = <T extends keyof CreateProxyRoutePayload>(
    field: T,
    value: CreateProxyRoutePayload[T],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onCreateOrUpdate = async () => {
    let res;
    if (existData) {
      res = await updateProxyRoute({ ...formData, routeId: existData.id });
    } else {
      res = await createProxyRoute(formData);
    }

    if (!res || res.error) {
      return toast(getErrorToastData(res.error));
    }

    onOpenChangeHandler(false);
  };

  const onDelete = async () => {
    if (!existData) return;
    const res = await deleteProxyRoute({ id: existData.id });

    if (!res || res.error) {
      return toast(getErrorToastData(res.error));
    }

    onOpenChangeHandler(false);
  };

  const onOpenChangeHandler = async (open: boolean) => {
    onOpenChange(open);
    if (open) return;
    await timeout(100);
    setFormData(defaultFormData);
  };

  const isLoading = isCreateLoading || isUpdateLoading;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChangeHandler}>
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
              value={formData.method}
              onChange={(val) => onChangeForm('method', val)}
              className="editable-route-form__method"
            />
            <Input
              className="w-full"
              value={formData.name}
              onChange={(e) => onChangeForm('name', e.target.value)}
              placeholder="Название маршрута"
            />
          </HStack>
          <HStack>
            <div className="relative w-full">
              <Link
                size={16}
                className="absolute left-3 top-1/2 z-[20] -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={formData.externalHost}
                onChange={(e) => onChangeForm('externalHost', e.target.value)}
                placeholder="Хост (https://example.com)"
                inputClassName="pl-[40px]"
                className="w-full"
              />
            </div>
            <Input
              value={formData.externalPath}
              onChange={(e) => onChangeForm('externalPath', e.target.value)}
              placeholder="Путь до эндпоинта (/users)"
              className="w-full"
            />
          </HStack>

          <VStack className="mt-2">
            <Text as="span" weight="medium">
              Права доступа
            </Text>
            <EditableProxyRouteScopes
              selectedScopes={formData.scopes || []}
              onChange={(scopes) => onChangeForm('scopes', scopes)}
            />
          </VStack>

          <HStack className="mt-2 justify-end">
            {!!existData && (
              <Button
                onClick={onDelete}
                variant="destructive_invert"
                className="mr-auto px-5"
                isLoading={isDeleteLoading}
              >
                Удалить
                <Trash2 size={16} />
              </Button>
            )}

            <Button
              onClick={() => onOpenChangeHandler(false)}
              variant="secondary"
              className="px-5"
            >
              Отмена
            </Button>
            <Button
              className="px-5"
              onClick={onCreateOrUpdate}
              isLoading={isLoading}
              disabled={
                !formData.name ||
                !formData.externalPath ||
                !formData.externalHost ||
                isLoading
              }
            >
              {!existData ? (
                <>
                  Добавить
                  <Plus size={16} />
                </>
              ) : (
                <>
                  Обновить
                  <Check size={16} />
                </>
              )}
            </Button>
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
