import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FriendRequest } from '../../../../core/models/friend-request.model';

@Component({
  selector: 'app-incoming-requests',
  imports: [],
  templateUrl: './incoming-requests.html',
  styleUrl: './incoming-requests.scss',
})
export class IncomingRequests {
  @Input({ required: true }) requests!: FriendRequest[];

  @Output() acceptClicked = new EventEmitter<string>();
  @Output() declineClicked = new EventEmitter<string>();
}