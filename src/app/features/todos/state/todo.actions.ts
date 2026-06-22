import { createActionGroup, props } from '@ngrx/store';

import { Todo } from '../../../core/models/todo.model';

export const TodoActions = createActionGroup({
  source: 'Todos',
  events: {
    'Load Todos Started': props<{ ownerId: string }>(),
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Load Todos Failure': props<{ error: string }>(),
  },
});