import { User } from '../../../core/models/user.model';
import { FriendRequest } from '../../../core/models/friend-request.model';

export const FRIEND_FEATURE_KEY = 'friends';

export interface FriendState {
  friends: User[];
  incomingRequests: FriendRequest[];
  outgoingRequests: FriendRequest[];
  searchResults: User[];
  loading: boolean;
  error: string | null;
}

export const initialFriendState: FriendState = {
  friends: [],
  incomingRequests: [],
  outgoingRequests: [],
  searchResults: [],
  loading: false,
  error: null,
};