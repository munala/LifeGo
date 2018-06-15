import sendRequest from '../../../utils/api';

const commentsUrl = `${process.env.REACT_APP_API_HOST}/api/comments/`;

export default {
  addComment: async (bucketlist, comment) => sendRequest({
    method: 'post',
    url: `${commentsUrl}${bucketlist.id.toString()}`,
    data: {
      content: comment.content,
      bucketlistId: bucketlist.id,
    },
  }),

  updateComment: async comment => sendRequest({
    method: 'put',
    url: `${commentsUrl}${comment.id.toString()}`,
    data: {
      content: comment.content,
    },
  }),

  deleteComment: async comment => sendRequest({
    method: 'delete',
    url: `${commentsUrl}${comment.id.toString()}`,
  }),
};
