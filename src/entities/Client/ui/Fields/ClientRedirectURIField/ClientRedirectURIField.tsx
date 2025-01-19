import { FC } from 'react';

import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';

import { ClientFieldOptions } from '../../../model/types/client';

type Props = ClientFieldOptions & {
  redirectUri: string;
  onChange: (field: 'redirectUri', value: string) => void;
};

export const ClientRedirectURIField: FC<Props> = (props) => {
  const { redirectUri, label, description, error, onChange } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('redirectUri', e.target.value);
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
        error={error}
        name="redirectUri"
        value={redirectUri}
        onChange={onChangeHandler}
        placeholder="https://example.com/verification_code"
      />
    </InputGroup>
  );
};
