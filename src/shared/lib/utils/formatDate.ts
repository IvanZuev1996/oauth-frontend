import { format } from 'date-fns';

/**
 * @description Format date to dd MMMM yyyy
 */
export const formatDate = (date: Date) => {
  return format(date, 'd MMMM yyyy');
};
