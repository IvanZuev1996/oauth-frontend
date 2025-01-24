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
  [AppRoutes.NEW_CLIENT]: '/clients/add',
  [AppRoutes.SCOPES]: '/scopes',
  [AppRoutes.TOKENS]: '/tokens',

  /* Auth routes */
  [AppRoutes.SIGN_IN]: '/signin',
  [AppRoutes.SIGN_UP]: '/signup',

  /* Api routes */
  [AppRoutes.AUTH_LOGOUT]: '/auth/logout',
  [AppRoutes.AUTH_REFRESH_TOKEN]: '/auth/refresh-token',
  [AppRoutes.AUTH_SIGN_IN]: '/auth/signin',
  [AppRoutes.AUTH_SIGN_UP]: '/auth/signup',

  /* OAuth routes */
  [AppRoutes.OAUTH_AUTHORIZE]: '/oauth/authorize',

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
export const oauthPageRoutes = [routeConfig.oauthAuthorize];

export const apiRoutes = [
  routeConfig.authSignIn,
  routeConfig.authSignUp,
  routeConfig.authLogout,
  routeConfig.authRefreshToken,
];
