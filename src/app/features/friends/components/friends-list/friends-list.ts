import { Component, Input } from '@angular/core';

import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-friends-list',
  imports: [],
  templateUrl: './friends-list.html',
  styleUrl: './friends-list.scss',
})
export class FriendsList {
  @Input({ required: true }) friends!: User[];
}
