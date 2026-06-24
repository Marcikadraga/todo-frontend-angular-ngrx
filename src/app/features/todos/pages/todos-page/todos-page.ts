import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, take } from 'rxjs';

import { selectCurrentUser } from '../../../auth/state/auth.selectors';
import { TodoItem } from '../../components/todo-item/todo-item';
import { TodoActions } from '../../state/todo.actions';
import {
  selectTodoError,
  selectTodoLoading,
  selectTodos,
} from '../../state/todo.selectors';

@Component({
  selector: 'app-todos-page',
  imports: [AsyncPipe, TodoItem],
  templateUrl: './todos-page.html',
  styleUrl: './todos-page.scss',
})
export class TodosPage implements OnInit {
  private readonly store = inject(Store);

  private readonly currentUser$ = this.store.select(selectCurrentUser);
  private readonly todos$ = this.store.select(selectTodos);
  private readonly loading$ = this.store.select(selectTodoLoading);
  private readonly error$ = this.store.select(selectTodoError);

  vm$ = combineLatest({
    currentUser: this.currentUser$,
    todos: this.todos$,
    loading: this.loading$,
    error: this.error$,
  });

  ngOnInit(): void {
    this.store
      .select(selectCurrentUser)
      .pipe(take(1))
      .subscribe(user => {
        if (!user) {
          return;
        }

        this.store.dispatch(
          TodoActions.loadTodosStarted({
            ownerId: user.id,
          })
        );
      });
  }
}