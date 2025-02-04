import { Check, X } from 'lucide-react';
import { FC } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from '@/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog/Dialog';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { clientModerationReducer } from '../../model/slice/clientModerationSlice';
import { DayOfWeekForm } from '../ClientModerationForms/DayOfWeekForm/DayOfWeekForm';
import { GeoBlackListForm } from '../ClientModerationForms/GeoBlackListForm/GeoBlackListForm';
import { GeoWhiteListForm } from '../ClientModerationForms/GeoWhiteListForm/GeoWhiteListForm';
import { IPBlackListForm } from '../ClientModerationForms/IPBlackListForm/IPBlackListForm';
import { IPWhiteListForm } from '../ClientModerationForms/IPWhiteListForm/IPWhiteListForm';
import { OnlyWorkingDaysForm } from '../ClientModerationForms/OnlyWorkingDaysForm/OnlyWorkingDaysForm';
import { RequestsPerMinuteForm } from '../ClientModerationForms/RequestsPerMinuteForm/RequestsPerMinuteForm';
import { TimeOfDayForm } from '../ClientModerationForms/TimeOfDayForm/TimeOfDayForm';

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

          <Text className="text-base" weight="medium">
            Задайте ограничения
          </Text>
          <VStack className="px-1">
            <OnlyWorkingDaysForm />
            <TimeOfDayForm />
            <DayOfWeekForm />
            <RequestsPerMinuteForm />
            <IPBlackListForm />
            <IPWhiteListForm />
            <GeoBlackListForm />
            <GeoWhiteListForm />
          </VStack>

          <DialogFooter className="mt-3 gap-2">
            <Button variant="secondary">
              <X /> Отклонить
            </Button>
            <Button>
              <Check />
              Принять и сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DynamicModuleLoader>
  );
};
