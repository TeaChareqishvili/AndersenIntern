import { TodoHistoryEventPayload } from '@shared';

export type HistoryPageRequest = {
  page: number;
  limit: number;
  sort: string;
  order: 'ASC' | 'DESC';
  event: string | null;
};

export type HistoryPageResponse = {
  items: TodoHistoryEventPayload[];
  total: number;
};

export interface BaseFileds {
  id: string;
  name: string;
}

export interface SubTask extends BaseFileds {
  completed: boolean;
}

export interface Todo extends BaseFileds {
  tasks: SubTask[];
}

export interface TodoHistoryDialogData {
  data: Todo | null;
  todo_id: string;
  event: string;
}
