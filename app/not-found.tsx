'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { routeConfig } from '@/shared/config/router/routeConfig';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(routeConfig.main);
  }, [router]);

  return <></>;
}
