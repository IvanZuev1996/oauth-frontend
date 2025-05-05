import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { RestMethods } from '@/shared/types/general/general';

import { Text } from '../Text/Text';

type Props = {
  method: RestMethods;
};

export const RestMethod: FC<Props> = ({ method }) => {
  const config: Record<RestMethods, { label: string; className: string }> = {
    GET: {
      label: 'GET',
      className: 'text-green-600',
    },
    POST: {
      label: 'POST',
      className: 'text-yellow-700',
    },
    PUT: {
      label: 'PUT',
      className: 'text-blue-700',
    },
    PATCH: {
      label: 'PATCH',
      className: 'text-purple-700',
    },
    DELETE: {
      label: 'DELETE',
      className: 'text-red-700',
    },
  };

  const { label, className } = config[method];

  return (
    <Text
      as="span"
      weight="medium"
      className={cn('w-[70px] text-sm uppercase', className)}
    >
      {label}
    </Text>
  );
};
