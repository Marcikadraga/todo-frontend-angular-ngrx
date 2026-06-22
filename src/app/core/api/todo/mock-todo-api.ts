import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { MOCK_TODOS } from '../../mock-data/mock-todos';
import { Todo } from '../../models/todo.model';
import { TodoApi } from './todo-api';

@Injectable()
export class MockTodoApi implements TodoApi {
  private todos: Todo[] = [...MOCK_TODOS];

  getTodosByOwnerId(ownerId: string): Observable<Todo[]> {
    const userTodos = this.todos.filter(todo => todo.ownerId === ownerId);

    return of(userTodos).pipe(delay(500));
  }
}