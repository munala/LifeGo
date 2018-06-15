import axios from 'axios';
import handleError from './handelError';

const bucketlistUrl = 'http://localhost:3002/api/bucketlists/';
const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const BucketlistService = {
  saveBucketlist(bucketlist) {
    const { id, ...bucketList } = bucketlist;
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .post(bucketlistUrl, { ...bucketList })
      .then(response => {
        if (response.data.message === `${bucketlist.name} already exists`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  addItem(bucketlist, item) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .post(`${bucketlistUrl + bucketlist.id.toString()}/items/`, {
        name: item.name
      })
      .then(response => {
        if (response.data.message === `${item.name} already exists`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },
  deleteBucketlist(bucketlist) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .delete(`${bucketlistUrl + bucketlist.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  getBucketlists(offset, limit, name) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .get(`${bucketlistUrl}?offset=${offset}&limit=${limit}&q=${name}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  getAllBucketlists(offset, limit, name) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .get(`${bucketlistUrl}all/?offset=${offset}&limit=${limit}&q=${name}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  updateBucketlist(bucketlist) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .put(`${bucketlistUrl + bucketlist.id.toString()}`, {
        ...bucketlist
      })
      .then(response => {
        if (response.data.message === `${bucketlist.name} is already in use`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  updateItem(bucketlist, item) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .put(`${bucketlistUrl + bucketlist.id}/items/${item.id}`, {
        name: item.name,
        done: item.done
      })
      .then(response => {
        if (response.data.message === `${item.name} is already in use`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  deleteItem(bucketlist, item) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .delete(`${bucketlistUrl + bucketlist.id}/items/${item.id}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  }
};

export default BucketlistService;
