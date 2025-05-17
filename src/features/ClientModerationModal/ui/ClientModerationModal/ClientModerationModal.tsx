import { FC, useState } from 'react';

import {
  ClientStatusEnum,
  ClientWithScopeDetails,
  useUpdateClientStatusMutation,
} from '@/entities/Client';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog/Dialog';

import { getClientModerationFormDataSelector } from '../../model/selectors/clientModerationSelectors';
import { clientModerationReducer } from '../../model/slice/clientModerationSlice';
import { ClientApproveStep } from '../ClientApproveStep/ClientApproveStep';
import { ClientModerationStep } from '../ClientModerationStep/ClientModerationStep';

type Props = {
  isOpen: boolean;
  client: ClientWithScopeDetails;
  onOpenChange: (open: boolean) => void;
};

const reducers: ReducerList = {
  clientModeration: clientModerationReducer,
};

export const ClientModerationModal: FC<Props> = (props) => {
  const { isOpen, client, onOpenChange } = props;
  const { toast } = useToast();

  const [step, setStep] = useState<'moderation' | 'approve'>('moderation');
  const data = useAppSelector(getClientModerationFormDataSelector);
  const [updateClientStatus, { isLoading }] = useUpdateClientStatusMutation();

  const onChangeStatus = async (
    status: typeof ClientStatusEnum.ACTIVE | typeof ClientStatusEnum.REJECTED,
  ) => {
    const res = await updateClientStatus({
      clientId: client.clientId,
      status,
      options: data,
    });

    if (!res || res.error) {
      const err = getErrorToastData(res.error);
      return toast(err);
    }

    onOpenChange(false);
    toast({
      title:
        status === ClientStatusEnum.ACTIVE
          ? 'Приложение одобрено'
          : 'Приложение отклонено',
      description:
        status === ClientStatusEnum.ACTIVE
          ? 'Теперь приложение доступно для использования'
          : 'Это приложение не сможет получать доступ к системе',
    });
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>

        <DialogContent className="max-h-[800px] max-w-[900px] overflow-y-auto">
          <DialogHeader className="pr-[40px]">
            <DialogTitle>Модерация приложения «{client.name}»</DialogTitle>
            <DialogDescription>
              Внимательно изучите сведения о приложении и требуемые доступы
              (scopes). Наложите необходимые ограничения при необходимости или
              отклоните приложение.
            </DialogDescription>
          </DialogHeader>

          {step === 'moderation' && (
            <ClientModerationStep
              onReject={() => onChangeStatus(ClientStatusEnum.REJECTED)}
              onNextStep={() => setStep('approve')}
              isLoading={isLoading}
            />
          )}
          {step === 'approve' && (
            <ClientApproveStep
              onBack={() => setStep('moderation')}
              onNextStep={() => onChangeStatus(ClientStatusEnum.ACTIVE)}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>
    </DynamicModuleLoader>
  );
};
