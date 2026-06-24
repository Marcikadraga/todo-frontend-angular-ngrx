export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';

export interface FriendRequest {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  status: FriendRequestStatus;
  createdAt: string;
  respondedAt: string | null;
}