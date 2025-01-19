export interface Client {
  clientId: string;
  userId: number;
  clientSecret: string;
  redirectUri: string;
  name: string;
  companyEmail: string;
  scopes: string[];
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientWithScopeDetails extends Omit<Client, 'scopes'> {
  scopes: Scopes;
}

export type ShortClientInfo = Pick<
  Client,
  'clientId' | 'name' | 'createdAt' | 'img'
>;

export type Scopes = {
  [serviceKey: string]: {
    [scopeKey: string]: {
      title: string;
      requiresApproval: boolean;
      ttl: number;
      isTtlRefreshable: boolean;
    };
  };
};

/* Internal */

export type ClientFieldOptions = {
  label?: string;
  description?: string;
  error?: string;
};

/* API Payloads */

export type CreateClientPayload = Pick<
  Client,
  'name' | 'scopes' | 'img' | 'companyEmail' | 'redirectUri'
>;

export type UpdateClientPayload = CreateClientPayload &
  Pick<Client, 'clientId'>;

export type DeleteClientPayload = Pick<Client, 'clientId'>;
