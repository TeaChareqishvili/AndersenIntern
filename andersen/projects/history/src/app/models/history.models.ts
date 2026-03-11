import { Todo, TODO_HISTORY_EVENTS } from '@shared';

export type HistoryEventRequest = {
  event: TODO_HISTORY_EVENTS;
  todo_id: string;
  date?: string;
  todo?: Todo;
};

export type HistoryPageRequest = {
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
};

export type HistoryPageResponse = {
  items: HistoryEventRequest[];
  total: number;
};
