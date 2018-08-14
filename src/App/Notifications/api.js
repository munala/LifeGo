import sendRequest from '../../utils/api';
import { generateQuery } from '../../utils';
import {
  notificationFields,
  responseMessageFields,
} from '../Common/fields';

const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

export default {
  getNotifications: async () => {
    const queryData = {
      mutation: 'getNotifications',
      fields: notificationFields,
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
      mutation: 'markNotificationAsRead',
      fields: notificationFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  deleteNotification: async (notification) => {
    const args = { id: notification.id };

    const queryData = {
      args,
      mutation: 'deleteNotification',
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
