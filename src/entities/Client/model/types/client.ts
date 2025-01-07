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
