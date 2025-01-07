import { UserRoles, UserRolesWithoutAdmin } from '@/shared/types/roles/roles';

export interface User {
  id: number;
  roleId: number;
  login: string;
  name: string;
  telegram: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSchema {
  data?: User;
}

/* API Payloads */

export type UsersSortField =
  | 'isBanned'
  | 'id'
  | 'login'
  | 'level'
  | 'defaultPercentage'
  | 'createdAt';

export interface GetUsersQueryParams {
  limit: number;
  offset: number;
  role: UserRoles;
  curatorId?: string;
  sortType?: 'asc' | 'desc';
  sortField?: UsersSortField;
  query?: string;
}

export interface SetCuratorPayload {
  id: number;
  publicTelegram: string;
  name: string;
  defaultPercentage?: number;
}

export interface BanUserPayload {
  isBanned: boolean;
  id: number;
  userRole: UserRolesWithoutAdmin;
}

export interface GetUserQueryParams {
  role: UserRoles;
  id: number;
}
