import { FC } from 'react';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { OAuthErrors } from '../../config/oauthAuthorizePage';

import './OAuthParamsErrorForm.css';

type Props = {
  error: OAuthErrors;
};

export const OAuthParamsErrorForm: FC<Props> = ({ error }) => {
  const config: Record<OAuthErrors, string> = {
    'missed:client_id': "Отсутствует обязательный параметр 'client_id'",
    'missed:response_type': "Отсутствует обязательный параметр 'response_type'",
    not_found: 'Неизвестно приложение с таким client_id',
  };

  return (
    <VStack className="oauth-error-form">
      <Text as="h1" weight="semibold">
        OAuth ID
      </Text>
      <Text as="span" weight="semibold">
        400
      </Text>
      <Text>{config[error]}</Text>
    </VStack>
  );
};
