import { Todo } from '../../../core/models/todo.model';

export const TODO_FEATURE_KEY = 'todos';

export interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialTodoState: TodoState = {
  items: [],
  loading: false,
  error: null,
};