import SocketIOClient from 'socket.io-client';
import * as messageActions from '../App/Chat/actions';
import * as commentActions from '../App/Common/actions/commentActions';
import * as likeActions from '../App/Common/actions/likeActions';
import * as notificationActions from '../App/Notifications/actions';
import homeActions from '../App/Home/actions';
import myListActions from '../App/MyLists/actions';
import * as userActions from '../App/Profile/actions';
import * as userAlertActions from '../App/UserAlerts/actions';

const bucketlistActions = { ...homeActions, myListActions };

export default (store) => {
  const socket = SocketIOClient(process.env.API_HOST);
  socket.on('messages', (data) => {
    const storeData = store.getState();

    if (
      data.type === 'new' &&
      storeData.profile.id === data.message.receiverId
    ) {
      store.dispatch(messageActions.sendMessageSuccess(data.message));
    }

    if (data.type === 'update' || data.type === 'markAsRead') {
      store.dispatch(messageActions.editMessageSuccess(data.message));
    }

    if (data.type === 'delete') {
      store.dispatch(messageActions.deleteMessageSuccess(data.message));
    }
  });

  socket.on('conversations', (data) => {
    const storeData = store.getState();

    if (
      data.type === 'new' &&
      storeData.profile.id === data.conversation.receiverId
    ) {
      store.dispatch(messageActions.startConversationSuccess(data.conversation));
    }

    if (data.type === 'delete') {
      store.dispatch(messageActions.deleteConversationSuccess({
        message: '',
        conversation: data.conversation,
      }));
    }
  });

  socket.on('notifications', (data) => {
    const storeData = store.getState();
    let notify;

    storeData.data.bucketlists.forEach((bucketlist) => {
      if (bucketlist.id === data.notification.bucketlistId) {
        notify = true;
      }
    });

    storeData.allData.bucketlists.forEach((bucketlist) => {
      if (bucketlist.id === data.notification.bucketlistId) {
        notify = true;
      }
    });

    if (
      data.type === 'new' &&
      notify &&
      data.notification.sourceUserId !== storeData.profile.id
    ) {
      store.dispatch(notificationActions.newNotification({ notification: data.notification }));
    }
  });

  socket.on('bucketlists', (data) => {
    const storeData = store.getState();

    if (data.type === 'update') {
      storeData.profile.friends.forEach((friend) => {
        if (friend.id === data.bucketlist.userId) {
          store.dispatch(bucketlistActions.updateBucketlistSuccess(data.bucketlist));
        }
      });
    }

    if (data.type === 'delete') {
      storeData.profile.friends.forEach((friend) => {
        if (friend.id === data.bucketlist.userId) {
          store.dispatch(bucketlistActions.deleteBucketlistSuccess(data.bucketlist));
        }
      });
    }
  });

  socket.on('comments', (data) => {
    const storeData = store.getState();

    if (data.type === 'new') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          if (
            data.sourceUserId !== storeData.profile.id &&
            bucketlist.id === data.comment.bucketlistId
          ) {
            store.dispatch(commentActions.addCommentSuccess(
              {
                id: data.comment.bucketlistId,
              },
              data.comment,
            ));
          }
        });
      });
    }

    if (data.type === 'update') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          if (
            data.sourceUserId !== storeData.profile.id &&
            bucketlist.id === data.comment.bucketlistId
          ) {
            store.dispatch(commentActions.editCommentSuccess(
              {
                id: data.comment.bucketlistId,
              },
              data.comment,
            ));
          }
        });
      });
    }

    if (data.type === 'delete') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          bucketlist.comments.forEach((comm) => {
            if (comm.id === data.comment.id) {
              store.dispatch(commentActions.deleteCommentSuccess(bucketlist, data.comment));
            }
          });
        });
      });
    }
  });

  socket.on('likes', (data) => {
    const storeData = store.getState();

    if (data.type === 'like') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          if (
            data.like.likerId !== storeData.profile.id &&
            bucketlist.id === data.like.bucketlistId
          ) {
            store.dispatch(likeActions.likeSuccess(
              {
                id: data.like.bucketlistId,
              },
              data.like,
            ));
          }
        });
      });
    }

    if (data.type === 'unlike') {
      store.dispatch(likeActions.unlikeSuccess(data.like));
    }
  });

  socket.on('followers', (data) => {
    const storeData = store.getState();

    if (data.type === 'new') {
      if (storeData.profile.id === data.friend.id) {
        store.dispatch(userActions.addFollower(data.user));
      }
    }

    if (data.type === 'remove') {
      if (storeData.profile.id === data.friend.id) {
        store.dispatch(userActions.removeFollower(data.user));
      }
    }
  });

  socket.on('user_notifications', (data) => {
    const storeData = store.getState();
    if (data.type === 'new') {
      if (storeData.profile.id === data.alert.friendId) {
        store.dispatch(userAlertActions.newAlert({ alert: data.alert }));
      }
    }
  });
};
