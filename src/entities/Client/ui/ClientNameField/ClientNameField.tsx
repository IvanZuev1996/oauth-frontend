import { FC } from 'react';

import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';

import { ClientFieldOptions } from '../../model/types/client';

type Props = ClientFieldOptions & {
  name: string;
  onChange: (value: string, field: 'name') => void;
};

export const ClientNameField: FC<Props> = (props) => {
  const { name, label, description, onChange } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, 'name');
  };

  return (
    <InputGroup
      label={label || 'Название Вашего сервиса'}
      description={description}
    >
      <Input
        value={name}
        onChange={onChangeHandler}
        placeholder="Название сервиса"
      />
    </InputGroup>
  );
};
