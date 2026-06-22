import { createReducer, on } from '@ngrx/store';

import { TodoActions } from './todo.actions';
import { initialTodoState, TodoState } from './todo.state';

export const todoReducer = createReducer(
  initialTodoState,

  on(TodoActions.loadTodosStarted, (state): TodoState => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),

  on(TodoActions.loadTodosSuccess, (state, { todos }): TodoState => {
    return {
      ...state,
      items: todos,
      loading: false,
      error: null,
    };
  }),

  on(TodoActions.loadTodosFailure, (state, { error }): TodoState => {
    return {
      ...state,
      items: [],
      loading: false,
      error,
    };
  })
);