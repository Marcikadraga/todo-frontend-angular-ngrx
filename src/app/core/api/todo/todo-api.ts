import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '../../models/todo.model';

export abstract class TodoApi {
  abstract getTodosByOwnerId(ownerId: string): Observable<Todo[]>;
}

export const TODO_API = new InjectionToken<TodoApi>('TODO_API');