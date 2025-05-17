export type UserRoles = 'admin' | 'user';
export type UserRolesWithoutAdmin = Exclude<UserRoles, 'admin'>;
