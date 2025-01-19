export interface Scope {
  key: string;
  title: string;
  requiresApproval: boolean;
  ttl: number;
  isTtlRefreshable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ScopeShortData = Pick<Scope, 'key' | 'title'>;

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

export interface GetScopesPayload {
  query?: string;
}
