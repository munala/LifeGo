import sendRequest from '../../utils/api';

const messageUrl = `${process.env.REACT_APP_API_HOST}/api/messages/`;

export default {
  sendMessage: async message => sendRequest({
    method: 'post',
    url: messageUrl,
    data: message,
  }),

  startConversation: async conversation => sendRequest({
    method: 'post',
    url: `${messageUrl}conversations`,
    data: conversation,
  }),

  updateMessage: async message => sendRequest({
    method: 'put',
    url: `${messageUrl}${message.id}`,
    data: {
      content: message.content,
    },
  }),

  markAsRead: async message => sendRequest({
    method: 'put',
    url: `${messageUrl}mark_as_read/${message.id}`,
  }),

  deleteMessage: async message => sendRequest({
    method: 'delete',
    url: `${messageUrl}${message.id}`,
  }),

  getConversations: async () => sendRequest({
    method: 'get',
    url: `${messageUrl}conversations`,
  }),

  deleteConversation: async conversation => sendRequest({
    method: 'delete',
    url: `${messageUrl}conversations/${conversation.id}`,
  }),
};
