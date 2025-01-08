import { UserRoles, UserRolesWithoutAdmin } from '@/shared/types/roles/roles';

export interface User {
  id: number;
  roleId: number;
  login: string;
  name: string;
  telegram: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSchema {
  data?: User;
}

/* Auth */

export interface AuthBackendResponse {
  type: string;
  access_token: string;
  refresh_token: string;
}

export interface SignInData {
  password: string;
  loginOrTg: string;
}

export interface SignUpData
  extends Pick<User, 'login' | 'telegram' | 'email' | 'name'> {
  password: string;
}

export interface AccessTokenPayload {
  userId: number;
  role: string;
  login: string;
  iat: number;
  exp: number;
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
