import { sendGraphQLRequest } from '../../../utils/api';
import {
  likeFields,
  responseMessageFields,
} from '../fields';

export default {
  like: async (bucketlist) => {
    const queryData = {
      args: { bucketlistId: bucketlist.id },
      mutation: 'like',
      fields: likeFields,
    };

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
  },
};
