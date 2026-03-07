import { TODO_HISTORY_EVENTS } from '@shared';

export type HistoryEventRequest = {
  event: TODO_HISTORY_EVENTS;
  todo_id: string;
  date?: string;
};

export type HistoryPageRequest = {
  page: number;
  limit: number;
};

export type HistoryPageResponse = {
  items: HistoryEventRequest[];
  total: number;
};
