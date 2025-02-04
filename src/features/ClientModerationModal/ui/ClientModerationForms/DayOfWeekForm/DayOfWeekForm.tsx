import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { clientModerationActions } from '../../../model/slice/clientModerationSlice';
import { getClientModerationFormDataSelector } from '../../../selectors/clientModerationSelectors';
import { ClientModerationForm } from '../../ClientModerationForm/ClientModerationForm';

import './DayOfWeekForm.css';

const daysOfWeek = [
  {
    value: 1,
    label: 'Понедельник',
  },
  {
    value: 2,
    label: 'Вторник',
  },
  {
    value: 3,
    label: 'Среда',
  },
  {
    value: 4,
    label: 'Четверг',
  },
  {
    value: 5,
    label: 'Пятница',
  },
  {
    value: 6,
    label: 'Суббота',
  },
  {
    value: 0,
    label: 'Воскресенье',
  },
];

export const DayOfWeekForm = () => {
  const dispatch = useAppDispatch();
  const { dayOfWeek } = useAppSelector(getClientModerationFormDataSelector);

  const onCheckedChange = (checked: boolean) => {
    if (checked) {
      return dispatch(clientModerationActions.setDayOfWeek([0, 1, 4, 5]));
    }
    dispatch(clientModerationActions.setDayOfWeek());
  };

  const onChangeDayOfWeek = (day: number) => {
    if (!dayOfWeek?.includes(day)) {
      return dispatch(
        clientModerationActions.setDayOfWeek([...(dayOfWeek || []), day]),
      );
    }
    dispatch(
      clientModerationActions.setDayOfWeek(
        dayOfWeek.filter((item) => item !== day),
      ),
    );
  };

  return (
    <ClientModerationForm
      option="dayOfWeek"
      checked={Boolean(dayOfWeek)}
      onChange={onCheckedChange}
    >
      {dayOfWeek && (
        <div className="day-of-week-form">
          {daysOfWeek.map((day, idx) => (
            <HStack
              key={idx}
              className="day-of-week-form__item"
              onClick={() => onChangeDayOfWeek(day.value)}
            >
              <Text>{day.label}</Text>
              <Checkbox
                checked={dayOfWeek.includes(day.value)}
                className="ml-auto"
              />
            </HStack>
          ))}
        </div>
      )}
    </ClientModerationForm>
  );
};
