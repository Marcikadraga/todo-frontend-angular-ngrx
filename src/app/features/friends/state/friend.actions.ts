import { createActionGroup, props } from '@ngrx/store';

import { User } from '../../../core/models/user.model';
import { FriendRequest } from '../../../core/models/friend-request.model';
import { Friendship } from '../../../core/models/friendship.model';

export const FriendActions = createActionGroup({
    source: 'Friends',
    events: {
        'Search Users Started': props<{
            query: string;
            currentUserId: string;
        }>(),

        'Search Users Success': props<{
            users: User[];
        }>(),

        'Search Users Failure': props<{
            error: string;
        }>(),
        'Load Friends Started': props<{
            userId: string;
        }>(),

        'Load Friends Success': props<{
            friends: User[];
        }>(),

        'Load Friends Failure': props<{
            error: string;
        }>(),

        'Load Incoming Requests Started': props<{
            userId: string;
        }>(),

        'Load Incoming Requests Success': props<{
            requests: FriendRequest[];
        }>(),

        'Load Incoming Requests Failure': props<{
            error: string;
        }>(),
        'Load Outgoing Requests Started': props<{
            userId: string;
        }>(),

        'Load Outgoing Requests Success': props<{
            requests: FriendRequest[];
        }>(),

        'Load Outgoing Requests Failure': props<{
            error: string;
        }>(),
        'Send Friend Request Started': props<{
            senderUserId: string;
            receiverUserId: string;
        }>(),

        'Send Friend Request Success': props<{
            request: FriendRequest;
        }>(),

        'Send Friend Request Failure': props<{
            error: string;
        }>(),
        'Accept Friend Request Started': props<{
            requestId: string;
        }>(),

        'Accept Friend Request Success': props<{
            request: FriendRequest;
            friendship: Friendship;
        }>(),

        'Accept Friend Request Failure': props<{
            error: string;
        }>(),

        'Decline Friend Request Started': props<{
            requestId: string;
        }>(),

        'Decline Friend Request Success': props<{
            request: FriendRequest;
        }>(),

        'Decline Friend Request Failure': props<{
            error: string;
        }>(),
    },
});