import { sendGraphQLRequest } from '../../utils/api';
import {
  notificationFields,
  responseMessageFields,
} from '../Common/fields';

export default {
  getNotifications: async () => {
    const queryData = {
      mutation: 'getNotifications',
      fields: notificationFields,
    };

    return sendGraphQLRequest(queryData);
  },

  markAsRead: async (notification) => {
    const args = { id: notification.id };

    const queryData = {
      args,
      mutation: 'markNotificationAsRead',
      fields: notificationFields,
    };

    return sendGraphQLRequest(queryData);
  },

  deleteNotification: async (notification) => {
    const args = { id: notification.id };

    const queryData = {
      args,
      mutation: 'deleteNotification',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },
};
