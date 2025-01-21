'use client';

import { FC } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { convertScopesToArray } from '@/entities/Scope';
import { User } from '@/entities/User';
import { OAuthAuthorizeForm } from '@/features/OauthAuthorizeForm';
import { OAuthErrors } from '@/shared/config/oauth/oauthConfig';
import { VStack } from '@/shared/ui/Stack';

import { OAuthParamsErrorForm } from '../OAuthParamsErrorForm/OAuthParamsErrorForm';

import './OAuthAuthorizePage.css';

type Props = {
  userData?: User;
  clientData?: ClientWithScopeDetails;
  error?: OAuthErrors;
};

export const OAuthAuthorizePage: FC<Props> = (props) => {
  const { userData, clientData, error } = props;

  const onLoginClick = () => {
    // TODO: login client
  };

  const renderFormContent = () => {
    if (!clientData || error) {
      return (
        <OAuthParamsErrorForm error={error || OAuthErrors.CLIENT_NOT_FOUND} />
      );
    }

    if (!userData) {
      // TODO: redirect on signIn page with target query params (&target=oauth)
      return null;
    }

    return (
      <OAuthAuthorizeForm
        user={userData}
        client={{
          img: clientData.img,
          name: clientData.name,
          scopes: convertScopesToArray(clientData.scopes),
        }}
        onLoginClick={onLoginClick}
      />
    );
  };

  return (
    <VStack className="oauth-authorize__page">{renderFormContent()}</VStack>
  );
};
