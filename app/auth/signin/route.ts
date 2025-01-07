import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AuthBackendResponse, SignInData } from '@/entities/User';
import { backendUrl } from '@/shared/const/system';
import { setAuthCookies } from '@/shared/lib/utils/cookies';

export async function POST(request: Request) {
  const body: SignInData = await request.json();

  try {
    const res: AxiosResponse<AuthBackendResponse> = await axios.post(
      `${backendUrl}/auth/signin`,
      body,
    );

    const { access_token, refresh_token } = res.data;

    setAuthCookies(access_token, refresh_token, await cookies());

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error;

      const data = response?.data;
      const status = response?.status;
      return NextResponse.json({ ...data }, { status });
    } else {
      return NextResponse.json(
        { error: 'Что-то пошло не так' },
        { status: 500 },
      );
    }
  }
}
