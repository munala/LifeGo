import { sendGraphQLRequest } from '../../../utils/api';
import {
  itemFields,
  listFields,
  bucketlistFields,
  responseMessageFields,
} from '../fields';

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

  return sendGraphQLRequest(queryData);
};

const BucketlistService = {
  saveBucketlist: async (bucketlist) => {
    const queryData = {
      args: bucketlist,
      mutation: 'createBucketlist',
      fields: bucketlistFields,
    };

    return sendGraphQLRequest(queryData);
  },

  deleteBucketlist: async (bucketlist) => {
    const queryData = {
      args: { id: bucketlist.id },
      mutation: 'deleteBucketlist',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },

  getBucketlist: async (id) => {
    const queryData = {
      args: { id },
      mutation: 'getBucketlist',
      fields: bucketlistFields,
    };

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
  },

  addItem: async (bucketlist, item) => {
    const queryData = {
      args: { ...item, bucketlistId: bucketlist.id },
      mutation: 'createItem',
      fields: itemFields,
    };

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
  },
};

export default BucketlistService;
