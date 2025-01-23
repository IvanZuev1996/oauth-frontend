import { ClientWithScopeDetails } from '@/entities/Client';
import { ScopeShortData } from '@/entities/Scope';
import { User } from '@/entities/User';

import { OAuthAuthorizeParams } from '../../model/types/oauth';

type ClientData = Pick<ClientWithScopeDetails, 'clientId' | 'img' | 'name'> & {
  scopes: ScopeShortData[];
};
type ReadonlyProps = {
  readonly: true;
};
type NotReadonlyProps = {
  readonly: false;
  params: OAuthAuthorizeParams;
};
type PropsByReadonlyState = ReadonlyProps | NotReadonlyProps;

export type OAuthAuthorizeFormProps = PropsByReadonlyState & {
  user: User;
  client: ClientData;
};
