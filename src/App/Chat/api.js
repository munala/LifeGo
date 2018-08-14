import sendRequest from '../../utils/api';
import { generateQuery } from '../../utils';
import {
  messageFields,
  conversationFields,
  responseMessageFields,
} from '../Common/fields';

const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

export default {
  getConversations: async () => {
    const queryData = {
      mutation: 'getConversations',
      fields: conversationFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  sendMessage: async ({ senderId, receiverId, ...message }) => {
    const args = message;

    const queryData = {
      args,
      mutation: 'createMessage',
      fields: messageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  startConversation: async (conversation) => {
    const args = {
      receiverId: conversation.receiverId,
    };

    const queryData = {
      args,
      mutation: 'startConversation',
      fields: conversationFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  updateMessage: async (message) => {
    const args = {
      id: message.id,
      read: message.read,
      content: message.content,
      conversationId: message.conversationId,
    };

    const queryData = {
      args,
      mutation: 'updateMessage',
      fields: messageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  deleteMessage: async (message) => {
    const args = {
      id: message.id,
      conversationId: message.conversationId,
    };

    const queryData = {
      args,
      mutation: 'deleteMessage',
      fields: responseMessageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  deleteConversation: async (conversation) => {
    const args = {
      id: conversation.id,
    };

    const queryData = {
      args,
      mutation: 'deleteConversation',
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
