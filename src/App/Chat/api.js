import axios from 'axios';
import handleError from '../Common/api/handelError';

const messageUrl = `${process.env.REACT_APP_API_HOST}/api/messages/`;

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  async sendMessage(message) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .post(`${messageUrl}`, { ...message })
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async startConversation(conversation) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .post(`${messageUrl}conversations`, { ...conversation })
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async updateMessage(message) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .put(`${messageUrl}${message.id.toString()}`, {
        content: message.content,
      })
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async markAsRead(message) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .put(`${messageUrl}mark_as_read/${message.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async deleteMessage(message) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .delete(`${messageUrl}${message.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async getConversations() {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .get(`${messageUrl}conversations`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async deleteConversation(conversation) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .delete(`${messageUrl}conversations/${conversation.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
