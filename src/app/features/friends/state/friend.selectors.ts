import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FRIEND_FEATURE_KEY, FriendState } from './friend.state';

export const selectFriendState =
  createFeatureSelector<FriendState>(FRIEND_FEATURE_KEY);

export const selectFriends = createSelector(
  selectFriendState,
  state => state.friends
);

export const selectIncomingRequests = createSelector(
  selectFriendState,
  state => state.incomingRequests
);

export const selectOutgoingRequests = createSelector(
  selectFriendState,
  state => state.outgoingRequests
);

export const selectSearchResults = createSelector(
  selectFriendState,
  state => state.searchResults
);

export const selectFriendLoading = createSelector(
  selectFriendState,
  state => state.loading
);

export const selectFriendError = createSelector(
  selectFriendState,
  state => state.error
);