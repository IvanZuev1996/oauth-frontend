import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select/Select';
import { Separator } from '@/shared/ui/Separator/Separator';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { clientModerationActions } from '../../../model/slice/clientModerationSlice';
import { getClientModerationFormDataSelector } from '../../../selectors/clientModerationSelectors';
import { ClientModerationForm } from '../../ClientModerationForm/ClientModerationForm';

export const TimeOfDayForm = () => {
  const dispatch = useAppDispatch();
  const { timeOfDay } = useAppSelector(getClientModerationFormDataSelector);

  const onCheckedChange = (checked: boolean) => {
    if (checked) {
      return dispatch(
        clientModerationActions.setTimeOfDay({ from: 9, to: 18 }),
      );
    }

    dispatch(clientModerationActions.setTimeOfDay());
  };

  const onChangeTimeOfDay = (time: number, type: 'from' | 'to') => {
    if (type === 'from') {
      return dispatch(
        clientModerationActions.setTimeOfDay({
          from: time,
          to: timeOfDay?.to || 18,
        }),
      );
    }

    dispatch(
      clientModerationActions.setTimeOfDay({
        from: timeOfDay?.from || 9,
        to: time,
      }),
    );
  };

  return (
    <ClientModerationForm
      option="timeOfDay"
      checked={Boolean(timeOfDay)}
      onChange={onCheckedChange}
    >
      {timeOfDay && (
        <VStack>
          <Separator className="my-2" />
          <Text>
            Время работы: с {timeOfDay.from}:00 до {timeOfDay.to}:00
          </Text>

          <HStack>
            <Select
              value={String(timeOfDay.from)}
              onValueChange={(val) => onChangeTimeOfDay(+val, 'from')}
            >
              <SelectTrigger className="max-w-[200px] bg-background">
                <SelectValue placeholder="Укажите время дня" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(24)].map((_, index) => (
                  <SelectItem
                    key={index}
                    value={String(index)}
                    disabled={index >= timeOfDay.to}
                  >
                    {index.toString().padStart(2, '0')}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={String(timeOfDay.to)}
              onValueChange={(val) => onChangeTimeOfDay(+val, 'to')}
            >
              <SelectTrigger className="max-w-[200px] bg-background">
                <SelectValue placeholder="Укажите время дня" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(24)].map((_, index) => (
                  <SelectItem
                    key={index}
                    value={String(index)}
                    disabled={index <= timeOfDay.from}
                  >
                    {index.toString().padStart(2, '0')}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </HStack>
        </VStack>
      )}
    </ClientModerationForm>
  );
};
