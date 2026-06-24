import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { FriendRequest } from '../../models/friend-request.model';
import { Friendship } from '../../models/friendship.model';

export interface AcceptFriendRequestResponse {
  request: FriendRequest;
  friendship: Friendship;
}

export abstract class FriendApi {
  abstract searchUsers(
    query: string,
    currentUserId: string
  ): Observable<User[]>;

  abstract getFriends(userId: string): Observable<User[]>;

  abstract getIncomingRequests(userId: string): Observable<FriendRequest[]>;

  abstract getOutgoingRequests(userId: string): Observable<FriendRequest[]>;

  abstract sendFriendRequest(
    senderUserId: string,
    receiverUserId: string
  ): Observable<FriendRequest>;

  abstract acceptFriendRequest(
    requestId: string
  ): Observable<AcceptFriendRequestResponse>;

  abstract declineFriendRequest(
    requestId: string
  ): Observable<FriendRequest>;
}

export const FRIEND_API = new InjectionToken<FriendApi>('FRIEND_API');