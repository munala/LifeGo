import { sendGraphQLRequest } from '../../utils/api';
import {
  userNotificationFields,
  responseMessageFields,
} from '../Common/fields';

export default {
  getAlerts: async () => {
    const queryData = {
      mutation: 'getUserNotifications',
      fields: userNotificationFields,
    };

    return sendGraphQLRequest(queryData);
  },

  markAsRead: async (notification) => {
    const args = { id: notification.id };

    const queryData = {
      args,
      mutation: 'markUserNotificationAsRead',
      fields: userNotificationFields,
    };

    return sendGraphQLRequest(queryData);
  },

  deleteAlert: async (notification) => {
    const args = { id: notification.id };

    const queryData = {
      args,
      mutation: 'deleteUserNotification',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },
};
