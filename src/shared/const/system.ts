export const appName = 'OAUTH';
export const systemServiceName = 'pp';
export const selfDomain = process.env.NEXT_PUBLIC_DOMAIN!;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;

/* Upload options */
export const remotePort = process.env.NEXT_PUBLIC_REMOTE_PORT! || '';
export const remoteHostname = process.env.NEXT_PUBLIC_REMOTE_HOSTNAME!;
export const remoteProtocol = process.env.NEXT_PUBLIC_REMOTE_PROTOCOL! as
  | 'http'
  | 'https';

/* URLS */
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const selfUrl = process.env.NEXT_PUBLIC_SELF_URL!;
