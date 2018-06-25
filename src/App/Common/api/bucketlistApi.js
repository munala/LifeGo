import sendRequest from '../../../utils/api';

const bucketlistUrl = `${process.env.REACT_APP_API_HOST}/api/bucketlists/`;

const BucketlistService = {
  saveBucketlist: async bucketlist => sendRequest({
    method: 'post',
    url: bucketlistUrl,
    data: bucketlist,
  }),

  addItem: async (bucketlist, item) => sendRequest({
    method: 'post',
    url: `${bucketlistUrl + bucketlist.id.toString()}/items/`,
    data: {
      name: item.name,
    },
  }),

  deleteBucketlist: async bucketlist => sendRequest({
    method: 'delete',
    url: `${bucketlistUrl + bucketlist.id.toString()}`,
  }),

  getBucketlists: async (offset, limit, name) => sendRequest({
    method: 'get',
    url: `${bucketlistUrl}?offset=${offset}&limit=${limit}&q=${name}`,
  }),

  getAllBucketlists: async (offset, limit, name) => sendRequest({
    method: 'get',
    url: `${bucketlistUrl}all?offset=${offset}&limit=${limit}&q=${name}`,
  }),

  explore: async (offset, limit, name) => sendRequest({
    method: 'get',
    url: `${bucketlistUrl}explore?offset=${offset}&limit=${limit}&q=${name}`,
  }),

  updateBucketlist: async bucketlist => sendRequest({
    method: 'put',
    url: `${bucketlistUrl + bucketlist.id.toString()}`,
    data: bucketlist,
  }),

  updateItem: async (bucketlist, item) => sendRequest({
    method: 'put',
    url: `${bucketlistUrl + bucketlist.id}/items/${item.id}`,
    data: {
      name: item.name,
      done: item.done,
    },
  }),

  deleteItem: async (bucketlist, item) => sendRequest({
    method: 'delete',
    url: `${bucketlistUrl + bucketlist.id}/items/${item.id}`,
  }),
};

export default BucketlistService;
