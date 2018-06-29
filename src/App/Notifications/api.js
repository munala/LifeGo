import sendRequest from '../../utils/api';

const notificationsUrl = `${process.env.REACT_APP_API_HOST}/api/notifications/`;

export default {
  getNotifications: async () => sendRequest({
    method: 'get',
    url: notificationsUrl,
  }),

  markAsRead: async notification => sendRequest({
    method: 'put',
    url: `${notificationsUrl}${notification.id.toString()}`,
  }),

  deleteNotification: async notification => sendRequest({
    method: 'delete',
    url: `${notificationsUrl}${notification.id.toString()}`,
  }),
};
