import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { FriendRequest } from '../../models/friend-request.model';
import { Friendship } from '../../models/friendship.model';
import { User } from '../../models/user.model';

import { MOCK_FRIEND_REQUESTS } from '../../mock-data/mock-friend-requests';
import { MOCK_FRIENDSHIPS } from '../../mock-data/mock-friendships';
import { MOCK_USERS } from '../../mock-data/mock-users';

import {
    AcceptFriendRequestResponse,
    FriendApi,
} from './friend-api';

@Injectable()
export class MockFriendApi implements FriendApi {
    private users: User[] = MOCK_USERS.map(user => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    });

    private friendRequests: FriendRequest[] = [...MOCK_FRIEND_REQUESTS];

    private friendships: Friendship[] = [...MOCK_FRIENDSHIPS];

    searchUsers(
        query: string,
        currentUserId: string
    ): Observable<User[]> {
        const normalizedQuery = query.toLowerCase().trim();

        if (!normalizedQuery) {
            return of([]).pipe(delay(300));
        }

        const foundUsers = this.users.filter(user => {
            const isCurrentUser = user.id === currentUserId;

            const matchesUsername = user.username
                .toLowerCase()
                .includes(normalizedQuery);

            const matchesEmail = user.email
                .toLowerCase()
                .includes(normalizedQuery);

            return !isCurrentUser && (matchesUsername || matchesEmail);
        });

        return of(foundUsers).pipe(delay(300));
    }

    getFriends(userId: string): Observable<User[]> {
        const relatedFriendships = this.friendships.filter(friendship => {
            return friendship.userId === userId || friendship.friendId === userId;
        });

        const friendIds = relatedFriendships.map(friendship => {
            if (friendship.userId === userId) {
                return friendship.friendId;
            }

            return friendship.userId;
        });

        const friends = this.users.filter(user => {
            return friendIds.includes(user.id);
        });

        return of(friends).pipe(delay(300));
    }

    getIncomingRequests(userId: string): Observable<FriendRequest[]> {
        const incomingRequests = this.friendRequests
            .filter(request => request.receiverUserId === userId)
            .filter(request => request.status === 'pending');

        return of(incomingRequests).pipe(delay(300));
    }

    getOutgoingRequests(userId: string): Observable<FriendRequest[]> {
        const outgoingRequests = this.friendRequests
            .filter(request => request.senderUserId === userId)
            .filter(request => request.status === 'pending');

        return of(outgoingRequests).pipe(delay(300));
    }

    sendFriendRequest(
        senderUserId: string,
        receiverUserId: string
    ): Observable<FriendRequest> {
        throw new Error('Method not implemented.');
    }

    acceptFriendRequest(
        requestId: string
    ): Observable<AcceptFriendRequestResponse> {
        throw new Error('Method not implemented.');
    }

    declineFriendRequest(requestId: string): Observable<FriendRequest> {
        throw new Error('Method not implemented.');
    }
}