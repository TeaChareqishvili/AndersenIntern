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

export enum INTERCEPTOR_NAV {
  LOGIN = 'sign-in',
}

export enum TODO_HISTORY_EVENTS {
  CREATE_TODO = 'CREATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

export type TodoHistoryEventData = {
  todo_id: string;
};
