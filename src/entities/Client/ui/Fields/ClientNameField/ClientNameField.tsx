import { FC } from 'react';

import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';

import { ClientFieldOptions } from '../../../model/types/client';

type Props = ClientFieldOptions & {
  name: string;
  onChange: (field: 'name', value: string) => void;
};

export const ClientNameField: FC<Props> = (props) => {
  const { name, label, description, error, onChange } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('name', e.target.value);
  };

  return (
    <InputGroup
      label={label || 'Название Вашего сервиса'}
      description={description}
    >
      <Input
        id="name"
        error={error}
        value={name}
        onChange={onChangeHandler}
        placeholder="Название сервиса"
      />
    </InputGroup>
  );
};
