import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap, take } from 'rxjs';

import { FRIEND_API } from '../../../core/api/friend/friend-api';
import { FriendActions } from './friend.actions';

import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../auth/state/auth.selectors';



@Injectable()
export class FriendEffects {
  private readonly actions$ = inject(Actions);
  private readonly friendApi = inject(FRIEND_API);
  private readonly store = inject(Store);

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

  reloadFriendsAfterAccept$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(FriendActions.acceptFriendRequestSuccess),

    switchMap(() => {
      return this.store.select(selectCurrentUser).pipe(
        take(1),

        switchMap(user => {
          if (!user) {
            return EMPTY;
          }

          return of(
            FriendActions.loadFriendsStarted({
              userId: user.id,
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
      console.log('ACCEPT STARTED:', action.requestId);

      return this.friendApi
        .acceptFriendRequest(action.requestId)
        .pipe(
          map(response => {
            console.log('ACCEPT SUCCESS:', response);

            return FriendActions.acceptFriendRequestSuccess({
              request: response.request,
              friendship: response.friendship,
            });
          }),

          catchError(error => {
            console.log('ACCEPT ERROR:', error);

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
      console.log('DECLINE STARTED:', action.requestId);

      return this.friendApi
        .declineFriendRequest(action.requestId)
        .pipe(
          map(request => {
            console.log('DECLINE SUCCESS:', request);

            return FriendActions.declineFriendRequestSuccess({
              request: request,
            });
          }),

          catchError(error => {
            console.log('DECLINE ERROR:', error);

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