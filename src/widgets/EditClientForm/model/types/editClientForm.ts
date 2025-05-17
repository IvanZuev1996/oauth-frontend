import { ClientWithScopeDetails } from '@/entities/Client';
import { ScopeShortData } from '@/entities/Scope';

export interface EditClientFormSchema {
  data: EditClientFormData;
}

export type EditClientFormData = Pick<
  ClientWithScopeDetails,
  'name' | 'img' | 'companyEmail' | 'redirectUri'
> & {
  scopes: ScopeShortData[];
};
