import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import {
  PropsWithClassName,
  RestMethods,
} from '@/shared/types/general/general';

import { RestMethod } from '../RestMethod/RestMethod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select/Select';

const methods: RestMethods[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

type Props = PropsWithClassName & {
  value?: RestMethods;
  onChange: (value: RestMethods) => void;
};

export const RestMethodSelect: FC<Props> = (props) => {
  const { value, className, onChange } = props;

  return (
    <Select value={value || 'GET'} onValueChange={onChange}>
      <SelectTrigger className={cn('w-[180px]', className)}>
        <SelectValue placeholder="Метод" />
      </SelectTrigger>

      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
        {methods.map((method, idx) => (
          <SelectItem value={method} key={idx}>
            <RestMethod method={method} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
