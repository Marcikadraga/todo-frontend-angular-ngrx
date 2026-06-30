import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule],
  templateUrl: './user-search.html',
  styleUrl: './user-search.scss',
})
export class UserSearch {
  @Input({ required: true }) users!: User[];

  @Output() searchClicked = new EventEmitter<string>();
  @Output() addFriendClicked = new EventEmitter<string>();

  searchText = '';

  search(): void {
    const trimmedSearchText = this.searchText.trim();

    if (!trimmedSearchText) {
      return;
    }

    this.searchClicked.emit(trimmedSearchText);
  }

  addFriend(userId: string): void {
    this.addFriendClicked.emit(userId);
  }
}