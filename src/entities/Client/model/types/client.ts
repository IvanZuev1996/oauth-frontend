import { ScopeShortData } from '@/entities/Scope';
import { FromToOptions } from '@/shared/types/general/general';

export interface Client {
  clientId: string;
  userId: number;
  clientSecret: string | null;
  redirectUri: string;
  name: string;
  companyEmail: string;
  scopes: string[];
  img: string;
  status: ClientStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

export enum ClientStatusEnum {
  ACTIVE = 'active',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export interface ClientWithScopeDetails extends Omit<Client, 'scopes'> {
  scopes: Scopes;
}

export type ShortClientInfo = Pick<
  Client,
  'clientId' | 'name' | 'createdAt' | 'img' | 'status'
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

export interface ClientScopesOptions {
  /* Только рабочие дни */
  workingDaysOnly?: boolean;

  /* Время дня в которое будет разрешен доступ */
  timeOfDay?: FromToOptions;

  /* Дни недели в которые будет разрешен доступ */
  dayOfWeek?: number[];

  /* Количество запросов в минуту */
  requestsPerMinute?: number;

  /* Скоупы, которые должны быть выданы */
  // dependentScopes?: ScopeShortData[];

  /* Список разрешённых IP-адресов */
  ipWhitelist?: string[];

  /* Список запрещённых IP-адресов */
  ipBlacklist?: string[];

  /* Список разрешённых стран */
  geoWhitelist?: string[];

  /* Список запрещённых стран */
  geoBlacklist?: string[];
}

/* API Payloads */

export type CreateClientPayload = Pick<
  Client,
  'name' | 'scopes' | 'img' | 'companyEmail' | 'redirectUri'
>;

export type UpdateClientPayload = CreateClientPayload &
  Pick<Client, 'clientId'>;

export type DeleteClientPayload = Pick<Client, 'clientId'>;
