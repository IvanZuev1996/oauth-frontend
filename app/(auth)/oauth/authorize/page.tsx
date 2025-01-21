import { cache } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { User } from '@/entities/User';
import { OAuthAuthorizePage } from '@/pages/OAuthAuthorizePage';
import { customServerFetch } from '@/shared/api/customServerFetch';
import { OAuthErrors } from '@/shared/config/oauth/oauthConfig';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const getClient = cache(async (clientId: string) => {
  const url = `clients/${clientId}`;
  return await customServerFetch<ClientWithScopeDetails>(url);
});

const getUser = cache(async () => {
  const url = 'users/me';
  return await customServerFetch<User>(url);
});

export default async function OAuthAuthorize({ searchParams }: Props) {
  const params = await searchParams;
  const clientRes = await getClient(params.client_id || '');
  const userRes = await getUser();

  const getError = () => {
    const { client_id, response_type } = params;
    if (!client_id) return OAuthErrors.MISSED_CLIENT_ID;
    if (!response_type) return OAuthErrors.MISSED_RESPONSE_TYPE;
    if (!clientRes.data) return OAuthErrors.CLIENT_NOT_FOUND;

    return undefined;
  };

  return (
    <OAuthAuthorizePage
      userData={userRes.data || undefined}
      clientData={clientRes.data || undefined}
      error={getError()}
    />
  );
}
