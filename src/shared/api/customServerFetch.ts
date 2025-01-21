import { cookies } from 'next/headers';

import { backendUrl } from '../const/system';

export async function customServerFetch<T>(path: string, init?: RequestInit) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;

    const req: Response = await fetch(`${backendUrl}/${path}`, {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      ...init,
    });

    const status = req.status;
    const res = await req.json();
    const data = status.toString()[0] !== '2' ? null : (res as T);
    const errors = status.toString()[0] !== '2' ? res.errors : null;

    return { data, status, errors };
  } catch (error) {
    console.log(error);
    return { data: null, status: 500, errors: null };
  }
}
