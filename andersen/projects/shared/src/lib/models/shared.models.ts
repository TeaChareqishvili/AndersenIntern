import { TODO_HISTORY_EVENTS } from '@shared';

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

export interface TodoHistoryEventPayload {
  event: TODO_HISTORY_EVENTS;
  todo_id: string;
  task_id?: string;
  todo_name?: string;
}

export type TodoHistoryEventData = {
  todo_id: string;
};
