import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '../../models/todo.model';
import { TodoApi } from './todo-api';

@Injectable()
export class RealTodoApi implements TodoApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/api/todos';

  getTodosByOwnerId(ownerId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}?ownerId=${ownerId}`);
  }
}