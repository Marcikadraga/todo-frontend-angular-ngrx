import { Component, Input } from '@angular/core';

import { Todo } from '../../../../core/models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  @Input({ required: true }) todo!: Todo;
}