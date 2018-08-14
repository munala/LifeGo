import sendRequest from '../../utils/api';
import { generateQuery } from '../../utils';
import {
  userNotificationFields,
  responseMessageFields,
} from '../Common/fields';

const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

export default {
  getAlerts: async () => {
    const queryData = {
      mutation: 'getUserNotifications',
      fields: userNotificationFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  markAsRead: async (notification) => {
    const args = { id: notification.id };

    const queryData = {
      args,
      mutation: 'markUserNotificationAsRead',
      fields: userNotificationFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  deleteAlert: async (notification) => {
    const args = { id: notification.id };

    const queryData = {
      args,
      mutation: 'deleteUserNotification',
      fields: responseMessageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },
};
