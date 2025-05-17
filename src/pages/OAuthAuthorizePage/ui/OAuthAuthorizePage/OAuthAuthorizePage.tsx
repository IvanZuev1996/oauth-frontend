'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { convertScopesToArray } from '@/entities/Scope';
import { User } from '@/entities/User';
import { OAuthAuthorizeForm, OAuthAuthorizeParams } from '@/features/OAuth';
import { OAuthErrors } from '@/shared/config/oauth/oauthConfig';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { RedirectTargets } from '@/shared/const/router';
import { generateURIWithQueryParams } from '@/shared/lib/utils/links';
import { Loader } from '@/shared/ui/Loader/Loader';
import { VStack } from '@/shared/ui/Stack';

import { OAuthParamsErrorForm } from '../OAuthParamsErrorForm/OAuthParamsErrorForm';

import './OAuthAuthorizePage.css';

type Props = {
  userData?: User;
  clientData?: ClientWithScopeDetails;
  params?: OAuthAuthorizeParams;
};

export const OAuthAuthorizePage: FC<Props> = (props) => {
  const { userData, clientData, params } = props;
  const router = useRouter();

  useEffect(() => {
    if (userData) return;
    const authRedirectQueryParams = {
      ...params,
      target: RedirectTargets.OAUTH,
    };
    const uri = generateURIWithQueryParams(
      routeConfig.signIn,
      authRedirectQueryParams,
    );
    router.replace(uri);
  }, [params, router, userData]);

  const getError = () => {
    if (!params) return OAuthErrors.MISSED_CLIENT_ID;

    const { client_id, response_type, code_challenge, code_challenge_method } =
      params;

    if (!client_id) return OAuthErrors.MISSED_CLIENT_ID;
    if (!response_type) return OAuthErrors.MISSED_RESPONSE_TYPE;
    if (!code_challenge) return OAuthErrors.MISSED_CODE_CHALLENGE;
    if (!code_challenge_method) return OAuthErrors.MISSED_CODE_CHALLENGE_METHOD;
    if (!clientData) return OAuthErrors.CLIENT_NOT_FOUND;

    return undefined;
  };

  const renderFormContent = () => {
    const error = getError();

    if (!userData) return <Loader />;

    if (!clientData || error || !params) {
      return (
        <OAuthParamsErrorForm error={error || OAuthErrors.CLIENT_NOT_FOUND} />
      );
    }

    return (
      <OAuthAuthorizeForm
        readonly={false}
        params={params}
        user={userData}
        client={{
          clientId: clientData.clientId,
          img: clientData.img,
          name: clientData.name,
          scopes: convertScopesToArray(clientData.scopes),
        }}
      />
    );
  };

  return (
    <VStack className="oauth-authorize__page">{renderFormContent()}</VStack>
  );
};
