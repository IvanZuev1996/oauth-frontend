import { ApiRoutes } from '../../const/router';

export interface BaseQueryArgs {
  url: string;
  method: string;
  api?: ApiRoutes;
}
