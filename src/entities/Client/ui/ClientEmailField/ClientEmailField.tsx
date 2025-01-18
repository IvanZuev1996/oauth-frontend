import { FC } from 'react';

import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';

import { ClientFieldOptions } from '../../model/types/client';

type Props = ClientFieldOptions & {
  email: string;
  onChange: (value: string, field: 'email') => void;
};

export const ClientEmailField: FC<Props> = (props) => {
  const { email, label, description, onChange } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, 'email');
  };

  return (
    <InputGroup
      label={label || 'Email'}
      description={
        description ||
        'Укажите почту компании или свою. Будем оповещать об изменениях во внешней авторизации'
      }
    >
      <Input
        name="email"
        value={email}
        onChange={onChangeHandler}
        placeholder="company@mail.ru"
      />
    </InputGroup>
  );
};
