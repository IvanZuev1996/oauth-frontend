import {
  remoteHostname,
  remotePort,
  remoteProtocol,
} from '@/shared/const/system';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: remoteProtocol,
        hostname: remoteHostname,
        port: remotePort,
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
