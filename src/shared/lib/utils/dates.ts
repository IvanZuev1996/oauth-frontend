import { format } from 'date-fns';

export const getHour = (hour: number) =>
  hour.toString().padStart(2, '0') + ':00';

export const getDayName = (dayNumber: number) => {
  const date = new Date(2024, 0, dayNumber);
  return format(date, 'EEEE');
};
