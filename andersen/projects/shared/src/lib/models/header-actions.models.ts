export enum GLOBAL_NAV_TYPES {
  LOGIN = 'sign-in',
  REGISTER = 'sign-up',
  USER = 'user',
  TODO = 'todo',
  LOGOUT = 'logout',
  HOME = '',
}

export type HeaderAction = {
  type: GLOBAL_NAV_TYPES;
};
