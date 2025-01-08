export interface Client {
  clientId: string;
  userId: number;
  clientSecret: string;
  redirectUri: string;
  name: string;
  companyEmail: string;
  scope: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ShortClientInfo = Pick<
  Client,
  'clientId' | 'name' | 'createdAt' | 'img'
>;

/* API Payloads */
export type CreateClientPayload = Pick<
  Client,
  'name' | 'scope' | 'img' | 'companyEmail' | 'redirectUri'
>;

export type UpdateClientPayload = CreateClientPayload &
  Pick<Client, 'clientId'>;

export type DeleteClientPayload = Pick<Client, 'clientId'>;
