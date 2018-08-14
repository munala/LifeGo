import { sendGraphQLRequest } from '../../utils/api';
import {
  messageFields,
  conversationFields,
  responseMessageFields,
} from '../Common/fields';

export default {
  getConversations: async () => {
    const queryData = {
      mutation: 'getConversations',
      fields: conversationFields,
    };

    return sendGraphQLRequest(queryData);
  },

  sendMessage: async ({ senderId, receiverId, ...message }) => {
    const args = message;

    const queryData = {
      args,
      mutation: 'createMessage',
      fields: messageFields,
    };

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
  },
};
