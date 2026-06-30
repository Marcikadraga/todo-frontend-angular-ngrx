import { Component, Input } from '@angular/core';

import { FriendRequest } from '../../../../core/models/friend-request.model';

@Component({
  selector: 'app-outgoing-requests',
  imports: [],
  templateUrl: './outgoing-requests.html',
  styleUrl: './outgoing-requests.scss',
})
export class OutgoingRequests {
  @Input({ required: true }) requests!: FriendRequest[];
}