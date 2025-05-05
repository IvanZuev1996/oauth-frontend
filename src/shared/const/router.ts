export enum AppRoutes {
  MAIN = 'main',
  CLIENT_DETAILS = 'clientDetails',
  NEW_CLIENT = 'newClient',
  EDIT_CLIENT = 'editClient',
  SCOPES = 'scopes',
  TOKENS = 'tokens',
  MODERATION = 'moderation',
  PROXY_ROUTES = 'proxyRoutes',

  /* Api routes */
  AUTH_LOGOUT = 'authLogout',
  AUTH_REFRESH_TOKEN = 'authRefreshToken',
  AUTH_SIGN_IN = 'authSignIn',
  AUTH_SIGN_UP = 'authSignUp',

  /* Auth routes */
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',

  /* OAuth route */
  OAUTH_AUTHORIZE = 'oauthAuthorize',
}

export enum ChildServicesRoutes {}

export enum RedirectTargets {
  OAUTH = 'oauth',
}

export enum ApiRoutes {
  NEXT_SELF = 'next-self',
  SELF = 'self',
}

export const getRouteClientDetails = (id: string | number) => `/clients/${id}`;
export const getRouteEditClient = (id: string | number) =>
  `/clients/edit/${id}`;
