import { ApiRoutes, AppRoutes, ChildServicesRoutes } from '../../const/router';
import { backendUrl } from '../../const/system';

export const routeConfig: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NEW_CLIENT]: '/new-client',
  [AppRoutes.SIGN_IN]: '/signin',
  [AppRoutes.AUTH_LOGOUT]: '/auth/logout',
  [AppRoutes.AUTH_REFRESH_TOKEN]: '/auth/refresh-token',
  [AppRoutes.AUTH_SIGN_IN]: '/auth/signin',
  [AppRoutes.AUTH_SIGN_UP]: '/auth/signup',
};

export const childServicesRouteConfig: Record<ChildServicesRoutes, string> = {};

export const apiRoutesConfig: Record<
  ApiRoutes,
  { baseUrl: string; isNeedCustomQuery: boolean }
> = {
  [ApiRoutes.NEXT_SELF]: {
    baseUrl: '',
    isNeedCustomQuery: false,
  },
  [ApiRoutes.SELF]: {
    baseUrl: backendUrl,
    isNeedCustomQuery: true,
  },
};

/* Specific routes */
export const authPageRoutes = [routeConfig.signIn];

export const apiRoutes = [
  routeConfig.authSignIn,
  routeConfig.authSignUp,
  routeConfig.authLogout,
  routeConfig.authRefreshToken,
];
