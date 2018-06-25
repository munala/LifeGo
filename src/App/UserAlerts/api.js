import sendRequest from '../../utils/api';

const userAlertsUrl = `${process.env.REACT_APP_API_HOST}/api/user_notifications/`;

export default {
  getAlerts: async () => sendRequest({
    method: 'get',
    url: userAlertsUrl,
  }),

  updateAlert: async alert => sendRequest({
    method: 'put',
    url: `${userAlertsUrl}${alert.id.toString()}`,
  }),

  markAsRead: async alert => sendRequest({
    method: 'put',
    url: `${userAlertsUrl}${alert.id.toString()}`,
  }),

  deleteAlert: async alert => sendRequest({
    method: 'delete',
    url: `${userAlertsUrl}${alert.id.toString()}`,
  }),
};
