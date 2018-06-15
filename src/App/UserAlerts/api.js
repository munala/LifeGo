import axios from 'axios';
import handleError from '../Common/api/handelError';

const userAlertsUrl = 'http://localhost:3002/api/user_notifications/';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  getAlerts() {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .get(`${userAlertsUrl}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  updateAlert(alert) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .put(`${userAlertsUrl}${alert.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  markAsRead(alert) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .put(`${userAlertsUrl}${alert.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  deleteAlert(alert) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .delete(`${userAlertsUrl}${alert.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  }
};
