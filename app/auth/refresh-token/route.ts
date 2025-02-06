import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { cookieOptions } from '@/shared/config/cookies/cookiesOptions';
import { selfDomain, backendUrl } from '@/shared/const/system';

interface AuthBackendResponse {
  type: string;
  access_token: string;
  refresh_token: string;
}

export async function POST() {
  const cookiesStore = await cookies();
  try {
    const refresh_token = cookiesStore.get('refresh_token')!.value;

    const res: AxiosResponse<AuthBackendResponse> = await axios.post(
      `${backendUrl}/auth/refresh-token`,
      { refresh_token },
    );

    const options = {
      ...cookieOptions,
    };

    cookiesStore.set('refresh_token', res.data.refresh_token, {
      ...options,
      httpOnly: true,
    });

    cookiesStore.set('access_token', res.data.access_token, options);

    return NextResponse.json({ status: 'ok' });
  } catch (_) {
    const options = {
      path: '/',
      domain: selfDomain,
      secure: process.env.NEXT_PUBLIC_MODE === 'production',
      expires: new Date(0),
    };
    const response = NextResponse.json(
      { error: 'unauthorized' },
      { status: 401 },
    );
    response.cookies.set('access_token', '', options);
    response.cookies.set('refresh_token', '', { ...options, httpOnly: true });
    return response;
  }
}
