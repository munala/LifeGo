import axios from 'axios';
import handleError from '../Common/api/handelError';

const notificationsUrl = 'http://localhost:3002/api/notifications/';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  getNotifications() {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .get(`${notificationsUrl}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  updateNotification(notification) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .put(`${notificationsUrl}${notification.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  markAsRead(notification) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .put(`${notificationsUrl}${notification.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  deleteNotification(notification) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .delete(`${notificationsUrl}${notification.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  }
};
