import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FriendRequest } from '../../models/friend-request.model';
import { Friendship } from '../../models/friendship.model';
import { User } from '../../models/user.model';

import {
  AcceptFriendRequestResponse,
  FriendApi,
} from './friend-api';

@Injectable()
export class RealFriendApi implements FriendApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/api';

  searchUsers(
    query: string,
    currentUserId: string
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users/search?query=${query}&currentUserId=${currentUserId}`
    );
  }

  getFriends(userId: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users/${userId}/friends`
    );
  }

  getIncomingRequests(userId: string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(
      `${this.baseUrl}/users/${userId}/friend-requests/incoming`
    );
  }

  getOutgoingRequests(userId: string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(
      `${this.baseUrl}/users/${userId}/friend-requests/outgoing`
    );
  }

  sendFriendRequest(
    senderUserId: string,
    receiverUserId: string
  ): Observable<FriendRequest> {
    return this.http.post<FriendRequest>(
      `${this.baseUrl}/friend-requests`,
      {
        senderUserId,
        receiverUserId,
      }
    );
  }

  acceptFriendRequest(
    requestId: string
  ): Observable<AcceptFriendRequestResponse> {
    return this.http.post<AcceptFriendRequestResponse>(
      `${this.baseUrl}/friend-requests/${requestId}/accept`,
      {}
    );
  }

  declineFriendRequest(requestId: string): Observable<FriendRequest> {
    return this.http.post<FriendRequest>(
      `${this.baseUrl}/friend-requests/${requestId}/decline`,
      {}
    );
  }
}