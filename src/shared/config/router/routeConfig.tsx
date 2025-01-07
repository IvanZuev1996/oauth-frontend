import { ApiRoutes, AppRoutes, ChildServicesRoutes } from '../../const/router';
import { backendUrl } from '../../const/system';

export const routeConfig: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NEW_CLIENT]: '/new-client',
};

export const childServicesRouteConfig: Record<ChildServicesRoutes, string> = {
  [ChildServicesRoutes.PROFILE]: 'https://profile.reyting.pro',
  [ChildServicesRoutes.REF_PROGRAM]: 'https://profile.reyting.pro/ref-program',
  [ChildServicesRoutes.LEVEL_SKILL]: 'https://levelskill.pro',
  [ChildServicesRoutes.FREE_TOOLS]: 'https://reyting.pro/',
  [ChildServicesRoutes.AI_ASSISTANT]: 'https://ai-text.reyting.pro/',
};

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
