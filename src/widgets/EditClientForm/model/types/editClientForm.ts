import { ClientWithScopeDetails } from '@/entities/Client';

export interface EditClientFormSchema {
  data: EditClientFormData;
}

export type EditClientFormData = Pick<
  ClientWithScopeDetails,
  'name' | 'img' | 'scopes' | 'companyEmail' | 'redirectUri'
>;
