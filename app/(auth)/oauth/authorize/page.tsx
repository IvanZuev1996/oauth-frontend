import { OAuthAuthorizePage } from '@/pages/OAuthAuthorizePage';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function OAuthAuthorize({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <OAuthAuthorizePage
      clientId={params.client_id}
      responseType={params.response_type}
    />
  );
}
