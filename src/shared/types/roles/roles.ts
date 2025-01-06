export type UserRoles = 'administrator' | 'curator' | 'webmaster';
export type UserRolesWithoutAdmin = Exclude<UserRoles, 'administrator'>;
