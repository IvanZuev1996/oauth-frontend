import { JSX } from 'react';

import { somethingWrongText } from '@/shared/const/messages';
import { ErrorResponse } from '@/shared/types/general/general';

type ErrorToast = {
  title: string;
  variant: 'destructive';
  description?: string | JSX.Element;
  field?: string;
};

export const getErrorToastData = (error?: unknown): ErrorToast => {
  const err = error as ErrorResponse;
  const errorToast: ErrorToast = {
    variant: 'destructive',
    title: somethingWrongText,
  };
  if (!err || !err.data || !err.data.errors.length) {
    return errorToast;
  }

  if (err.data.errors.length) {
    errorToast.title = 'Произошла ошибка!';

    const error = err.data.errors[0];
    errorToast.description = error.message;
    errorToast.field = error.property;

    return errorToast;
  }

  return errorToast;
};
