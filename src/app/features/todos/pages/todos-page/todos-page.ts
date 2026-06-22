import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { selectCurrentUser } from '../../../auth/state/auth.selectors';
import { TodoActions } from '../../state/todo.actions';
import {
  selectTodoError,
  selectTodoLoading,
  selectTodos,
} from '../../state/todo.selectors';

@Component({
  selector: 'app-todos-page',
  imports: [AsyncPipe],
  templateUrl: './todos-page.html',
  styleUrl: './todos-page.scss',
})
export class TodosPage implements OnInit {
  private readonly store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
  todos$ = this.store.select(selectTodos);
  loading$ = this.store.select(selectTodoLoading);
  error$ = this.store.select(selectTodoError);

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
