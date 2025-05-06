import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import {
  PropsWithClassName,
  RestMethods,
} from '@/shared/types/general/general';

import { Text } from '../Text/Text';

type Props = PropsWithClassName & {
  method: RestMethods;
};

export const RestMethod: FC<Props> = ({ method, className }) => {
  const config: Record<RestMethods, { label: string; extraClass: string }> = {
    GET: {
      label: 'GET',
      extraClass: 'text-green-600',
    },
    POST: {
      label: 'POST',
      extraClass: 'text-yellow-700',
    },
    PUT: {
      label: 'PUT',
      extraClass: 'text-blue-700',
    },
    PATCH: {
      label: 'PATCH',
      extraClass: 'text-purple-700',
    },
    DELETE: {
      label: 'DELETE',
      extraClass: 'text-red-700',
    },
  };

  const { label, extraClass } = config[method];

  return (
    <Text
      as="span"
      weight="medium"
      className={cn('w-[70px] text-sm uppercase', extraClass, className)}
    >
      {label}
    </Text>
  );
};
