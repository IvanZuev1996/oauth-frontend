export enum AppRoutes {
  MAIN = 'main',
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  CLIENT_DETAILS = 'clientDetails',
  NEW_CLIENT = 'newClient',
  EDIT_CLIENT = 'editClient',
  AUTH_LOGOUT = 'authLogout',
  AUTH_REFRESH_TOKEN = 'authRefreshToken',
  AUTH_SIGN_IN = 'authSignIn',
  AUTH_SIGN_UP = 'authSignUp',
}

export enum ChildServicesRoutes {}

export enum ApiRoutes {
  NEXT_SELF = 'next-self',
  SELF = 'self',
}

export const getRouteClientDetails = (id: string | number) => `/clients/${id}`;
export const getRouteEditClient = (id: string | number) =>
  `/clients/edit/${id}`;
