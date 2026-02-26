export enum HEADER_ACTION_NAV_TYPES {
  LOGIN = 'sign-in',
  REGISTER = 'sign-up',
  USER = 'user',
  TODO = 'todo',
  LOGOUT = 'logout',
  HOME = '',
}

export type HeaderAction = {
  type: HEADER_ACTION_NAV_TYPES;
};
