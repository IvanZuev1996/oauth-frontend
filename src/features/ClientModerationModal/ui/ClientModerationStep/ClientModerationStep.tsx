import { ArrowRight, X } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/shared/ui/Button/Button';
import { DialogFooter } from '@/shared/ui/Dialog/Dialog';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { DayOfWeekForm } from '../ClientModerationStep/ClientModerationForms/DayOfWeekForm/DayOfWeekForm';
import { GetListForm } from '../ClientModerationStep/ClientModerationForms/GetListForm/GetListForm';
import { IPListForm } from '../ClientModerationStep/ClientModerationForms/IPListForm/IPListForm';
import { OnlyWorkingDaysForm } from '../ClientModerationStep/ClientModerationForms/OnlyWorkingDaysForm/OnlyWorkingDaysForm';
import { RequestsPerMinuteForm } from '../ClientModerationStep/ClientModerationForms/RequestsPerMinuteForm/RequestsPerMinuteForm';
import { TimeOfDayForm } from '../ClientModerationStep/ClientModerationForms/TimeOfDayForm/TimeOfDayForm';

type Props = {
  onNextStep: () => void;
  onReject: () => void;
  isLoading?: boolean;
};

export const ClientModerationStep: FC<Props> = (props) => {
  const { isLoading, onReject, onNextStep } = props;

  return (
    <>
      <Text className="text-base" weight="medium">
        Задайте ограничения
      </Text>
      <VStack className="px-1">
        <OnlyWorkingDaysForm />
        <TimeOfDayForm />
        <DayOfWeekForm />
        <RequestsPerMinuteForm />
        <IPListForm ipListType="black" />
        <IPListForm ipListType="white" />
        <GetListForm geoListType="black" />
        <GetListForm geoListType="white" />
      </VStack>

      <DialogFooter className="mt-3 gap-2">
        <Button variant="secondary" onClick={onReject} isLoading={isLoading}>
          <X /> Отклонить
        </Button>
        <Button className="w-full max-w-[150px]" onClick={onNextStep}>
          Далее <ArrowRight />
        </Button>
      </DialogFooter>
    </>
  );
};
