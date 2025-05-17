import { Client } from '@/entities/Client';
import { User } from '@/entities/User';

export interface ClientToken {
  tokenId: string;
  userId: number;
  clientId: string;
  scope: string;
  isRevoked: boolean;
  expiresAt: Date;

  user?: User;
  client?: Client;
}
