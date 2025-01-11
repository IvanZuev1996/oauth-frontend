export const clientScopes: Record<
  string,
  { name: string; scopes: { name: string; key: string }[] }
> = {
  login: {
    name: 'Информация о пользователе',
    scopes: [
      { name: 'Доступ к логину пользователя', key: 'login' },
      { name: 'Доступ к имени пользователя', key: 'name' },
      { name: 'Доступ к телеграм пользователя', key: 'telegram' },
      { name: 'Доступ к email пользователя', key: 'email' },
    ],
  },
};
