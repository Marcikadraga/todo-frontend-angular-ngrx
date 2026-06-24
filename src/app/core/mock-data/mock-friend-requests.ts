import { FriendRequest } from '../models/friend-request.model';

export const MOCK_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: '1',
    senderUserId: '1',
    receiverUserId: '2',
    status: 'pending',
    createdAt: '2026-06-20',
    respondedAt: null,
  },
  {
    id: '2',
    senderUserId: '3',
    receiverUserId: '1',
    status: 'pending',
    createdAt: '2026-06-21',
    respondedAt: null,
  },
  {
    id: '3',
    senderUserId: '2',
    receiverUserId: '3',
    status: 'accepted',
    createdAt: '2026-06-18',
    respondedAt: '2026-06-19',
  },
  {
    id: '4',
    senderUserId: '4',
    receiverUserId: '1',
    status: 'declined',
    createdAt: '2026-06-17',
    respondedAt: '2026-06-18',
  },
];