import sendRequest from '../../../utils/api';
import { generateQuery } from '../../../utils/';
import {
  likeFields,
  responseMessageFields,
} from '../fields';

const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

export default {
  like: async (bucketlist) => {
    const queryData = {
      args: { bucketlistId: bucketlist.id },
      mutation: 'like',
      fields: likeFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },
  unlike: async (bucketlist, like) => {
    const queryData = {
      args: {
        id: like.id,
        bucketlistId: bucketlist.id,
      },
      mutation: 'unlike',
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
