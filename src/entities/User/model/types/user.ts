import { UserRoles, UserRolesWithoutAdmin } from '@/shared/types/roles/roles';

interface UserBalance {
  id: number;
  approved: number;
  hold: number;
  conclusion: number;
  userId: number;
}

export type UserLevelType = 1 | 2 | 3;

export interface User {
  id: number;
  isBanned: boolean;
  roleId: number;
  login: string;
  curatorId: number | null;
  phone: string | null;
  telegram: string | null;
  level: UserLevelType;
  name?: string;
  publicTelegram?: string;
  defaultPercentage?: number;
  createdAt: Date;
  updatedAt: Date;

  /* Relationships */
  curator?: User;
  balance?: UserBalance;
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
