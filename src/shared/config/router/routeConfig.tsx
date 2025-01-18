import {
  ApiRoutes,
  AppRoutes,
  ChildServicesRoutes,
  getRouteClientDetails,
  getRouteEditClient,
} from '../../const/router';
import { backendUrl } from '../../const/system';

export const routeConfig: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.SIGN_IN]: '/signin',
  [AppRoutes.SIGN_UP]: '/signup',
  [AppRoutes.NEW_CLIENT]: '/clients/add',
  [AppRoutes.AUTH_LOGOUT]: '/auth/logout',
  [AppRoutes.AUTH_REFRESH_TOKEN]: '/auth/refresh-token',
  [AppRoutes.AUTH_SIGN_IN]: '/auth/signin',
  [AppRoutes.AUTH_SIGN_UP]: '/auth/signup',

  /* Dynamic routes */
  [AppRoutes.CLIENT_DETAILS]: getRouteClientDetails(':id'),
  [AppRoutes.EDIT_CLIENT]: getRouteEditClient(':id'),
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
export const authPageRoutes = [routeConfig.signIn, routeConfig.signUp];

export const apiRoutes = [
  routeConfig.authSignIn,
  routeConfig.authSignUp,
  routeConfig.authLogout,
  routeConfig.authRefreshToken,
];
