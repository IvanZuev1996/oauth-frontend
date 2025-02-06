export interface Scope {
  key: string;
  title: string;
  requiresApproval: boolean;
  ttl: number;
  isTtlRefreshable: boolean;
  status: ScopeStatusEnum;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  clientsCount?: number;
  service?: {
    id: number;
    name: string;
  };
}

export type ScopeShortData = Pick<Scope, 'key' | 'title'>;
export type ScopeListItem = Pick<Scope, 'key' | 'title' | 'ttl' | 'status'>;

export enum ScopeStatusEnum {
  ACTIVE = 'active',
  REVOKED = 'revoked',
}

/* API Payloads */

export interface CreateScopePayload
  extends Pick<Scope, 'title' | 'requiresApproval' | 'ttl'> {
  serviceId: number;
  name: string;
  title: string;
  requiresApproval: boolean;
  ttl: number;
}

export interface DeleteScopePayload {
  scopeKey: string;
}

export interface ChangeScopeStatusPayload extends DeleteScopePayload {
  status: ScopeStatusEnum;
}

export interface GetScopesPayload {
  query?: string;
}
