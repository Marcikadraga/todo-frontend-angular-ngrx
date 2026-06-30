import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { FriendRequest } from '../../models/friend-request.model';
import { Friendship } from '../../models/friendship.model';
import { User } from '../../models/user.model';

import { MOCK_FRIEND_REQUESTS } from '../../mock-data/mock-friend-requests';
import { MOCK_FRIENDSHIPS } from '../../mock-data/mock-friendships';
import { MOCK_USERS } from '../../mock-data/mock-users';

import {
    areAlreadyFriends,
    hasPendingRequestBetweenUsers,
    userExists,
} from './friend-validation.helpers';

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

    private friendRequests: FriendRequest[] = MOCK_FRIEND_REQUESTS.map(request => {
        return {
            ...request,
        };
    });

    private friendships: Friendship[] = MOCK_FRIENDSHIPS.map(friendship => {
        return {
            ...friendship,
        };
    });


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
        if (!userExists(this.users, senderUserId)) {
            return throwError(() => new Error('Sender user not found'));
        }

        if (!userExists(this.users, receiverUserId)) {
            return throwError(() => new Error('Receiver user not found'));
        }

        if (
            hasPendingRequestBetweenUsers(
                this.friendRequests,
                senderUserId,
                receiverUserId
            )
        ) {
            return throwError(() => new Error('There is already a pending request between these users'));
        }

        if (
            areAlreadyFriends(
                this.friendships,
                senderUserId,
                receiverUserId
            )
        ) {
            return throwError(() => new Error('These users are already friends'));
        }

        const newRequest: FriendRequest = {
            id: crypto.randomUUID(),
            senderUserId,
            receiverUserId,
            status: 'pending',
            createdAt: new Date().toISOString(),
            respondedAt: null,
        };

        this.friendRequests.push(newRequest);

        return of(newRequest).pipe(delay(300));
    }

    acceptFriendRequest(requestId: string): Observable<AcceptFriendRequestResponse> {
        const request = this.friendRequests.find(request => {
            return request.id === requestId;
        });

        if (!request) {
            return throwError(() => new Error('Friend request not found'));
        }

        if (request.status !== 'pending') {
            return throwError(() => new Error('Friend request is not pending'));
        }

        const updatedRequest: FriendRequest = {
            ...request,
            status: 'accepted',
            respondedAt: new Date().toISOString(),
        };

        this.friendRequests = this.friendRequests.map(friendRequest => {
            if (friendRequest.id === requestId) {
                return updatedRequest;
            }

            return friendRequest;
        });

        const friendship: Friendship = {
            id: crypto.randomUUID(),
            userId: updatedRequest.senderUserId,
            friendId: updatedRequest.receiverUserId,
            createdAt: new Date().toISOString(),
        };

        this.friendships = [...this.friendships, friendship];

        return of({
            request: updatedRequest,
            friendship,
        }).pipe(delay(300));
    }

    declineFriendRequest(requestId: string): Observable<FriendRequest> {
        const request = this.friendRequests.find(request => {
            return request.id === requestId;
        });

        if (!request) {
            return throwError(() => new Error('Friend request not found'));
        }

        if (request.status !== 'pending') {
            return throwError(() => new Error('Friend request is not pending'));
        }

        const updatedRequest: FriendRequest = {
            ...request,
            status: 'declined',
            respondedAt: new Date().toISOString(),
        };

        this.friendRequests = this.friendRequests.map(friendRequest => {
            if (friendRequest.id === requestId) {
                return updatedRequest;
            }

            return friendRequest;
        });

        return of(updatedRequest).pipe(delay(300));
    }
}