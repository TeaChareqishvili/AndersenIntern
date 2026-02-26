export type SessionState = {
  token?: string;
};

export type BackendError = {
  error: string;
};

export type ResponseMessage = {
  message: string;
  navigateTo?: string;
};

export type AuthResponse = {
  email: string;
  password: string;
};
