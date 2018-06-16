import sendRequest from '../../../utils/api';

const likesUrl = `${process.env.REACT_APP_API_HOST}/api/likes/`;

export default {
  like: async bucketlist => sendRequest({
    method: 'post',
    url: likesUrl,
    data: {
      bucketlistId: bucketlist.id,
    },
  }),

  unlike: async like => sendRequest({
    method: 'delete',
    url: `${likesUrl}${like.id.toString()}`,
  }),
};
