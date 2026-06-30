import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, take } from 'rxjs';

import { selectCurrentUser } from '../../../auth/state/auth.selectors';
import { FriendActions } from '../../state/friend.actions';
import {
  selectFriendError,
  selectFriendLoading,
  selectFriends,
  selectIncomingRequests,
  selectOutgoingRequests,
  selectSearchResults,
} from '../../state/friend.selectors';

import { FriendsList } from '../../components/friends-list/friends-list';
import { IncomingRequests } from '../../components/incoming-requests/incoming-requests';
import { OutgoingRequests } from '../../components/outgoing-requests/outgoing-requests';

@Component({
  selector: 'app-friends-page',
  imports: [AsyncPipe, FriendsList, IncomingRequests, OutgoingRequests],
  templateUrl: './friends-page.html',
  styleUrl: './friends-page.scss',
})
export class FriendsPage implements OnInit {
  private readonly store = inject(Store);

  private readonly currentUser$ = this.store.select(selectCurrentUser);
  private readonly friends$ = this.store.select(selectFriends);
  private readonly incomingRequests$ = this.store.select(selectIncomingRequests);
  private readonly outgoingRequests$ = this.store.select(selectOutgoingRequests);
  private readonly searchResults$ = this.store.select(selectSearchResults);
  private readonly loading$ = this.store.select(selectFriendLoading);
  private readonly error$ = this.store.select(selectFriendError);

  vm$ = combineLatest({
    currentUser: this.currentUser$,
    friends: this.friends$,
    incomingRequests: this.incomingRequests$,
    outgoingRequests: this.outgoingRequests$,
    searchResults: this.searchResults$,
    loading: this.loading$,
    error: this.error$,
  });

  ngOnInit(): void {
    this.store
      .select(selectCurrentUser)
      .pipe(take(1))
      .subscribe(user => {
        if (!user) {
          return;
        }

        this.store.dispatch(
          FriendActions.loadFriendsStarted({
            userId: user.id,
          })
        );

        this.store.dispatch(
          FriendActions.loadIncomingRequestsStarted({
            userId: user.id,
          })
        );

        this.store.dispatch(
          FriendActions.loadOutgoingRequestsStarted({
            userId: user.id,
          })
        );
      });
  }
  
  acceptRequest(requestId: string): void {
    this.store.dispatch(
      FriendActions.acceptFriendRequestStarted({
        requestId,
      })
    );
  }

  declineRequest(requestId: string): void {
    this.store.dispatch(
      FriendActions.declineFriendRequestStarted({
        requestId,
      })
    );
  }
}