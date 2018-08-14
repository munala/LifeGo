import { sendGraphQLRequest } from '../../../utils/api';
import {
  commentFields,
  responseMessageFields,
} from '../fields';

export default {
  addComment: async (bucketlist, comment) => {
    const queryData = {
      args: { ...comment, bucketlistId: bucketlist.id },
      mutation: 'createComment',
      fields: commentFields,
    };

    return sendGraphQLRequest(queryData);
  },

  updateComment: async (bucketlist, comment) => {
    const queryData = {
      args: {
        id: comment.id,
        content: comment.content,
        bucketlistId: bucketlist.id,
      },
      mutation: 'updateComment',
      fields: commentFields,
    };

    return sendGraphQLRequest(queryData);
  },

  deleteComment: async (bucketlist, comment) => {
    const queryData = {
      args: {
        id: comment.id,
        bucketlistId: bucketlist.id,
      },
      mutation: 'deleteComment',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },
};
