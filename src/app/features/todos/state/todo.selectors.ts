import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TODO_FEATURE_KEY, TodoState } from './todo.state';

export const selectTodoState =
  createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const selectTodos = createSelector(
  selectTodoState,
  state => state.items
);

export const selectTodoLoading = createSelector(
  selectTodoState,
  state => state.loading
);

export const selectTodoError = createSelector(
  selectTodoState,
  state => state.error
);

export const selectCompletedTodos = createSelector(
  selectTodos,
  todos => todos.filter(todo => todo.completed)
);

export const selectPendingTodos = createSelector(
  selectTodos,
  todos => todos.filter(todo => !todo.completed)
);