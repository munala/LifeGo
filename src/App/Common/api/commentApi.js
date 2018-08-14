import sendRequest from '../../../utils/api';
import { generateQuery } from '../../../utils/';
import {
  commentFields,
  responseMessageFields,
} from '../fields';

const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

export default {
  addComment: async (bucketlist, comment) => {
    const queryData = {
      args: { ...comment, bucketlistId: bucketlist.id },
      mutation: 'createComment',
      fields: commentFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
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

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
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

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },
};
