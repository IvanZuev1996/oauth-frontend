import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { cookieOptions } from '@/shared/config/cookies/cookiesOptions';
import { backendUrl } from '@/shared/const/system';

export async function POST() {
  const cookiesStore = await cookies();
  try {
    const access_token = cookiesStore.get('access_token')!.value;
    const headers = { Authorization: `Bearer ${access_token}` };
    await axios.post(`${backendUrl}/auth/logout`, {}, { headers });
    const options = {
      ...cookieOptions,
      maxAge: -1,
    };

    const response = NextResponse.json({ logout: true });
    response.cookies.set('access_token', '', options);
    response.cookies.set('refresh_token', '', { ...options, httpOnly: true });

    return response;
  } catch (_) {
    return NextResponse.json({ error: 'Что-то пошло не так' }, { status: 500 });
  }
}
