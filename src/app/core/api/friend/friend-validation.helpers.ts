import { FriendRequest } from '../../models/friend-request.model';
import { Friendship } from '../../models/friendship.model';
import { User } from '../../models/user.model';

export function isTryingToAddSelf(
  senderUserId: string,
  receiverUserId: string
): boolean {
  return senderUserId === receiverUserId;
}

export function userExists(users: User[], userId: string): boolean {
  return users.some(user => user.id === userId);
}

export function hasPendingRequestBetweenUsers(
  friendRequests: FriendRequest[],
  firstUserId: string,
  secondUserId: string
): boolean {
  return friendRequests.some(request => {
    const sameDirection =
      request.senderUserId === firstUserId &&
      request.receiverUserId === secondUserId;

    const oppositeDirection =
      request.senderUserId === secondUserId &&
      request.receiverUserId === firstUserId;

    return request.status === 'pending' && (sameDirection || oppositeDirection);
  });
}

export function areAlreadyFriends(
  friendships: Friendship[],
  firstUserId: string,
  secondUserId: string
): boolean {
  return friendships.some(friendship => {
    const sameDirection =
      friendship.userId === firstUserId &&
      friendship.friendId === secondUserId;

    const oppositeDirection =
      friendship.userId === secondUserId &&
      friendship.friendId === firstUserId;

    return sameDirection || oppositeDirection;
  });
}