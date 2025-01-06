import {
  ApiRoutes,
  AppRoutes,
  ChildServicesRoutes,
  getRouteOfferDetails,
  getRouteOfferEdit,
} from '../../const/router';
import { backendUrl } from '../../const/system';

export const routeConfig: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LEADS]: '/leads',
  [AppRoutes.OFFERS]: '/offers',
  [AppRoutes.STATISTICS]: '/statistics',
  [AppRoutes.WEBMASTERS]: '/webmasters',
  [AppRoutes.CURATORS]: '/curators',
  [AppRoutes.CONNECTED_OFFERS]: '/offers/connected',
  [AppRoutes.ADD_OFFER]: '/offers/add',
  [AppRoutes.NOT_FOUND]: '/not-found',

  /* With dynamic params */
  [AppRoutes.OFFER_DETAILS]: getRouteOfferDetails(':id'),
  [AppRoutes.OFFER_EDIT]: getRouteOfferEdit(':id'),
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
