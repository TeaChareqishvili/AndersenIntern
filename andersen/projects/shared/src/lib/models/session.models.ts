export type SessionState = {
  token?: string;
};

export type BackendError = {
  error: string;
};

// this routes might be here temporary until we deside the global routing with shell maybe??
export enum AUTH_ROUTES {
  HOME = '',
  LOGIN = 'sign-in',
  REGISTER = 'sign-up',
  USER = 'user',
}

export type ResponseMessage = {
  message: string;
  navigateTo?: string;
};

export type AuthUser = {
  email: string;
  password: string;
};
