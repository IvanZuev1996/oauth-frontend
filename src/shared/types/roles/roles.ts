export type UserRoles = 'administrator' | 'user';
export type UserRolesWithoutAdmin = Exclude<UserRoles, 'administrator'>;
