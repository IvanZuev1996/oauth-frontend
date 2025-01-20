'use client';

import { FC } from 'react';

import { useGetClientDataQuery } from '@/entities/Client';
import { OAuthAuthorizeForm } from '@/features/OauthAuthorizeForm';
import { Loader } from '@/shared/ui/Loader/Loader';
import { VStack } from '@/shared/ui/Stack';

import { OAuthErrors } from '../../config/oauthAuthorizePage';
import { OAuthParamsErrorForm } from '../OAuthParamsErrorForm/OAuthParamsErrorForm';

import './OAuthAuthorizePage.css';

type Props = {
  clientId?: string;
  responseType?: string;
};

export const OAuthAuthorizePage: FC<Props> = ({ clientId, responseType }) => {
  const { data, isLoading, isFetching } = useGetClientDataQuery(
    { clientId: clientId || '' },
    { skip: !clientId },
  );

  const getErrorVariant = () => {
    if (!clientId) return OAuthErrors.missedClientId;
    if (!responseType) return OAuthErrors.missedResponseType;
    return OAuthErrors.notFound;
  };

  const renderFormContent = () => {
    if (isLoading || isFetching) {
      return <Loader className="h-[150px]" />;
    }

    if (!clientId || !responseType || !data) {
      return <OAuthParamsErrorForm error={getErrorVariant()} />;
    }

    return <OAuthAuthorizeForm client={data} />;
  };

  return (
    <VStack className="oauth-authorize__page">{renderFormContent()}</VStack>
  );
};
