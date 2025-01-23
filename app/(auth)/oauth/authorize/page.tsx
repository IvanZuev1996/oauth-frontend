import { cache } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { User } from '@/entities/User';
import { OAuthAuthorizeParams } from '@/features/OAuth';
import { OAuthAuthorizePage } from '@/pages/OAuthAuthorizePage';
import { customServerFetch } from '@/shared/api/customServerFetch';

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

  const paramsData: OAuthAuthorizeParams = {
    ...params,
    client_id: params.client_id || '',
    response_type: params.response_type || '',
    code_challenge: params.code_challenge || '',
    code_challenge_method: params.code_challenge_method || '',
  };

  return (
    <OAuthAuthorizePage
      userData={userRes.data || undefined}
      clientData={clientRes.data || undefined}
      params={paramsData}
    />
  );
}
