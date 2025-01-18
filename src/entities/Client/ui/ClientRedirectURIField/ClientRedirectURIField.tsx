import { FC } from 'react';

import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';

import { ClientFieldOptions } from '../../model/types/client';

type Props = ClientFieldOptions & {
  redirectUri: string;
  onChange: (value: string, field: 'redirectUri') => void;
};

export const ClientRedirectURIField: FC<Props> = (props) => {
  const { redirectUri, label, description, onChange } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, 'redirectUri');
  };

  return (
    <InputGroup
      label={label || 'Redirect URI'}
      description={
        description ||
        'Адрес страницы, куда направим пользователя после того, как он разрешил или отказал приложению в доступе'
      }
    >
      <Input
        name="redirectUri"
        value={redirectUri}
        onChange={onChangeHandler}
        placeholder="https://example.com/verification_code"
      />
    </InputGroup>
  );
};
