import sendRequest from '../../../utils/api';
import { generateQuery } from '../../../utils/';
import {
  itemFields,
  listFields,
  bucketlistFields,
  responseMessageFields,
} from '../fields';

const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

const getLists = async ({
  offset, limit, name, id, mutation,
}) => {
  const args = {
    offset, limit, name,
  };

  if (mutation === 'listOther') {
    args.id = id;
  }

  const queryData = {
    args,
    mutation,
    fields: listFields,
  };

  const query = generateQuery(queryData);

  return sendRequest({
    method: 'post',
    url,
    data: { query },
  });
};

const BucketlistService = {
  saveBucketlist: async (bucketlist) => {
    const queryData = {
      args: bucketlist,
      mutation: 'createBucketlist',
      fields: bucketlistFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  deleteBucketlist: async (bucketlist) => {
    const queryData = {
      args: { id: bucketlist.id },
      mutation: 'deleteBucketlist',
      fields: responseMessageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  getBucketlist: async (id) => {
    const queryData = {
      args: { id },
      mutation: 'getBucketlist',
      fields: bucketlistFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  getBucketlists: async (offset, limit, name) => getLists({
    offset, limit, name, mutation: 'list',
  }),

  getAllBucketlists: async (offset, limit, name) => getLists({
    offset, limit, name, mutation: 'listAll',
  }),

  getOtherBucketlists: async (offset, limit, name, id) => getLists({
    offset, limit, name, id, mutation: 'listOther',
  }),

  explore: async (offset, limit, name) => getLists({
    offset, limit, name, mutation: 'explore',
  }),

  updateBucketlist: async ({
    comments, likes, items, updatedAt, createdAt, user, userPictureUrl, userId, ...bucketlist
  }) => {
    const queryData = {
      args: bucketlist,
      mutation: 'updateBucketlist',
      fields: bucketlistFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  addItem: async (bucketlist, item) => {
    const queryData = {
      args: { ...item, bucketlistId: bucketlist.id },
      mutation: 'createItem',
      fields: itemFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  updateItem: async (bucketlist, item) => {
    const queryData = {
      args: {
        id: item.id,
        name: item.name,
        done: item.done,
        bucketlistId: bucketlist.id,
      },
      mutation: 'updateItem',
      fields: itemFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  deleteItem: async (bucketlist, item) => {
    const queryData = {
      args: {
        id: item.id,
        bucketlistId: bucketlist.id,
      },
      mutation: 'deleteItem',
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

export default BucketlistService;
