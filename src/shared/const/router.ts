export enum AppRoutes {
  MAIN = 'main',
  LEADS = 'leads',
  STATISTICS = 'statistics',
  OFFERS = 'offers',
  OFFER_DETAILS = 'offerDetails',
  OFFER_EDIT = 'offerEdit',
  NOT_FOUND = 'notFound',

  /* ROUTES FOR CURATORS */
  WEBMASTERS = 'webmasters',
  CONNECTED_OFFERS = 'connectedOffers',

  /* ROUTES FOR ADMINS */
  CURATORS = 'curators',
  ADD_OFFER = 'addOffer',
}

export enum ChildServicesRoutes {
  PROFILE = 'profile',
  REF_PROGRAM = 'refProgram',
  LEVEL_SKILL = 'levelSkill',
  FREE_TOOLS = 'freeTools',
  AI_ASSISTANT = 'aiAssistant',
}

export enum ApiRoutes {
  NEXT_SELF = 'next-self',
  SELF = 'self',
}

export const getRouteOfferDetails = (id: string | number) => `/offers/${id}`;
export const getRouteOfferEdit = (id: string | number) => `/offers/edit/${id}`;
