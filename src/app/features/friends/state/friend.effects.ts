import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { FRIEND_API } from '../../../core/api/friend/friend-api';
import { FriendActions } from './friend.actions';

@Injectable()
export class FriendEffects {
  private readonly actions$ = inject(Actions);
  private readonly friendApi = inject(FRIEND_API);

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Something went wrong';
  }

  searchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendActions.searchUsersStarted),

      switchMap(action => {
        return this.friendApi
          .searchUsers(action.query, action.currentUserId)
          .pipe(
            map(users => {
              return FriendActions.searchUsersSuccess({
                users: users,
              });
            }),

            catchError(error => {
              return of(
                FriendActions.searchUsersFailure({
                  error: this.getErrorMessage(error),
                })
              );
            })
          );
      })
    );
  });

  loadFriends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendActions.loadFriendsStarted),

      switchMap(action => {
        return this.friendApi
          .getFriends(action.userId)
          .pipe(
            map(friends => {
              return FriendActions.loadFriendsSuccess({
                friends: friends,
              });
            }),

            catchError(error => {
              return of(
                FriendActions.loadFriendsFailure({
                  error: this.getErrorMessage(error),
                })
              );
            })
          );
      })
    );
  });

  loadIncomingRequests$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendActions.loadIncomingRequestsStarted),

      switchMap(action => {
        return this.friendApi
          .getIncomingRequests(action.userId)
          .pipe(
            map(requests => {
              return FriendActions.loadIncomingRequestsSuccess({
                requests: requests,
              });
            }),

            catchError(error => {
              return of(
                FriendActions.loadIncomingRequestsFailure({
                  error: this.getErrorMessage(error),
                })
              );
            })
          );
      })
    );
  });

  loadOutgoingRequests$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendActions.loadOutgoingRequestsStarted),

      switchMap(action => {
        return this.friendApi
          .getOutgoingRequests(action.userId)
          .pipe(
            map(requests => {
              return FriendActions.loadOutgoingRequestsSuccess({
                requests: requests,
              });
            }),

            catchError(error => {
              return of(
                FriendActions.loadOutgoingRequestsFailure({
                  error: this.getErrorMessage(error),
                })
              );
            })
          );
      })
    );
  });

  sendFriendRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendActions.sendFriendRequestStarted),

      switchMap(action => {
        return this.friendApi
          .sendFriendRequest(action.senderUserId, action.receiverUserId)
          .pipe(
            map(request => {
              return FriendActions.sendFriendRequestSuccess({
                request: request,
              });
            }),

            catchError(error => {
              return of(
                FriendActions.sendFriendRequestFailure({
                  error: this.getErrorMessage(error),
                })
              );
            })
          );
      })
    );
  });

  acceptFriendRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendActions.acceptFriendRequestStarted),

      switchMap(action => {
        return this.friendApi
          .acceptFriendRequest(action.requestId)
          .pipe(
            map(response => {
              return FriendActions.acceptFriendRequestSuccess({
                request: response.request,
                friendship: response.friendship,
              });
            }),

            catchError(error => {
              return of(
                FriendActions.acceptFriendRequestFailure({
                  error: this.getErrorMessage(error),
                })
              );
            })
          );
      })
    );
  });

  declineFriendRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendActions.declineFriendRequestStarted),

      switchMap(action => {
        return this.friendApi
          .declineFriendRequest(action.requestId)
          .pipe(
            map(request => {
              return FriendActions.declineFriendRequestSuccess({
                request: request,
              });
            }),

            catchError(error => {
              return of(
                FriendActions.declineFriendRequestFailure({
                  error: this.getErrorMessage(error),
                })
              );
            })
          );
      })
    );
  });

}