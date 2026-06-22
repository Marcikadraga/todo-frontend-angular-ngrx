import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TODO_API } from '../../../core/api/todo/todo-api';
import { TodoActions } from './todo.actions';

@Injectable()
export class TodoEffects {
  private readonly actions$ = inject(Actions);
  private readonly todoApi = inject(TODO_API);

  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.loadTodosStarted),
      switchMap(({ ownerId }) => {
        return this.todoApi.getTodosByOwnerId(ownerId).pipe(
          map(todos => {
            return TodoActions.loadTodosSuccess({ todos });
          }),
          catchError(error => {
            return of(
              TodoActions.loadTodosFailure({
                error: this.getErrorMessage(error),
              })
            );
          })
        );
      })
    );
  });

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Something went wrong while loading todos';
  }
}