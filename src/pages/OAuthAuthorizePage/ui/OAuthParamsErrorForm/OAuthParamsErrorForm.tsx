import { FC } from 'react';

import { OAuthErrors } from '@/shared/config/oauth/oauthConfig';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './OAuthParamsErrorForm.css';

type Props = {
  error: OAuthErrors;
};

export const OAuthParamsErrorForm: FC<Props> = ({ error }) => {
  const config: Record<OAuthErrors, string> = {
    missedClientId: "Отсутствует обязательный параметр 'client_id'",
    missedResponseType: "Отсутствует обязательный параметр 'response_type'",
    clientNotFound: 'Неизвестно приложение с таким client_id',
    missedCodeChallenge: 'Отсутствует обязательный параметр "code_challenge"',
    missedCodeChallengeMethod:
      'Отсутствует обязательный параметр "code_challenge_method"',
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
