export const itemFields = ['id', 'done', 'name', 'createdAt', 'updatedAt', 'bucketlistId'];

export const commentFields = ['id', 'content', 'user', 'userPictureUrl', 'createdAt', 'updatedAt', 'bucketlistId'];

export const likeFields = ['id', 'likerId', 'createdAt', 'updatedAt', 'bucketlistId'];

export const bucketlistFields = [
  'id',
  'name',
  'description',
  'createdAt',
  'updatedAt',
  'category',
  'location',
  'dueDate',
  'pictureUrl',
  'privacy',
  'userId',
  'user',
  'userPictureUrl',
  { comments: commentFields },
  { items: itemFields },
  { likes: likeFields },
];

export const listFields = [
  'nextOffset',
  'prevOffset',
  { bucketlists: bucketlistFields },
];

export const responseMessageFields = ['message'];

export const messageFields = ['id', 'content', 'senderId', 'conversationId', 'read', 'receiverId', 'user', 'userPictureUrl', 'createdAt', 'updatedAt'];

export const conversationFields = [
  'id',
  'senderId',
  'receiverId',
  'senderPictureUrl',
  'senderDisplayName',
  'receiverPictureUrl',
  'receiverDisplayName',
  { messages: messageFields },
];

export const notificationFields = ['id', 'type', 'text', 'bucketlistId', 'sourceUserId', 'read', 'user', 'userPictureUrl', 'createdAt', 'updatedAt'];

export const userNotificationFields = ['id', 'type', 'text', 'friendId', 'userId', 'read', 'user', 'userPictureUrl', 'createdAt', 'updatedAt'];

export const userFields = ['id', 'username', 'email', 'displayName', 'pictureUrl', 'social', 'reminders', 'privacy'];

export const profileFields = [
  ...userFields,
  { friends: userFields },
  { followers: userFields },
];
