import { createReducer, on } from '@ngrx/store';

import { FriendActions } from './friend.actions';
import { FriendState, initialFriendState } from './friend.state';

export const friendReducer = createReducer(
    initialFriendState,

    on(FriendActions.searchUsersStarted, (state): FriendState => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    }),

    on(FriendActions.searchUsersSuccess, (state, { users }): FriendState => {
        return {
            ...state,
            searchResults: users,
            loading: false,
            error: null,
        };
    }),

    on(FriendActions.searchUsersFailure, (state, { error }): FriendState => {
        return {
            ...state,
            searchResults: [],
            loading: false,
            error,
        };
    }),

    on(FriendActions.loadFriendsStarted, (state): FriendState => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    }),

    on(FriendActions.loadFriendsSuccess, (state, { friends }): FriendState => {
        return {
            ...state,
            friends,
            loading: false,
            error: null,
        };
    }),

    on(FriendActions.loadFriendsFailure, (state, { error }): FriendState => {
        return {
            ...state,
            friends: [],
            loading: false,
            error,
        };
    }),

    on(FriendActions.loadIncomingRequestsStarted, (state): FriendState => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    }),

    on(FriendActions.loadIncomingRequestsSuccess, (state, { requests }): FriendState => {
        return {
            ...state,
            incomingRequests: requests,
            loading: false,
            error: null,
        };
    }
    ),

    on(FriendActions.loadIncomingRequestsFailure, (state, { error }): FriendState => {
        return {
            ...state,
            incomingRequests: [],
            loading: false,
            error,
        };
    }
    ),

    on(FriendActions.loadOutgoingRequestsStarted, (state): FriendState => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    }),

    on(FriendActions.loadOutgoingRequestsSuccess, (state, { requests }): FriendState => {
        return {
            ...state,
            outgoingRequests: requests,
            loading: false,
            error: null,
        };
    }
    ),

    on(FriendActions.loadOutgoingRequestsFailure, (state, { error }): FriendState => {
        return {
            ...state,
            outgoingRequests: [],
            loading: false,
            error,
        };
    }
    ),

    on(FriendActions.sendFriendRequestStarted, (state): FriendState => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    }),

    on(
        FriendActions.sendFriendRequestSuccess,
        (state, { request }): FriendState => {
            return {
                ...state,
                outgoingRequests: [...state.outgoingRequests, request],
                loading: false,
                error: null,
            };
        }
    ),

    on(
        FriendActions.sendFriendRequestFailure,
        (state, { error }): FriendState => {
            return {
                ...state,
                loading: false,
                error,
            };
        }
    ),

    on(FriendActions.acceptFriendRequestStarted, (state): FriendState => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    }),

    on(
        FriendActions.acceptFriendRequestSuccess,
        (state, { request }): FriendState => {
            return {
                ...state,
                incomingRequests: state.incomingRequests.filter(incomingRequest => {
                    return incomingRequest.id !== request.id;
                }),
                loading: false,
                error: null,
            };
        }
    ),

    on(
        FriendActions.acceptFriendRequestFailure,
        (state, { error }): FriendState => {
            return {
                ...state,
                loading: false,
                error,
            };
        }
    ),

    on(FriendActions.declineFriendRequestStarted, (state): FriendState => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    }),

    on(FriendActions.declineFriendRequestSuccess,(state, { request }): FriendState => {
            return {
                ...state,
                incomingRequests: state.incomingRequests.filter(incomingRequest => {
                    return incomingRequest.id !== request.id;
                }),
                loading: false,
                error: null,
            };
        }
    ),

    on(FriendActions.declineFriendRequestFailure,(state, { error }): FriendState => {
            return {
                ...state,
                loading: false,
                error,
            };
        }
    ),

);