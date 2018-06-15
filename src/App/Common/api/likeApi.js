import axios from 'axios';
import handleError from './handelError';

const likesUrl = `${process.env.API_HOST}/api/likes/`;

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  like(bucketlist) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .post(`${likesUrl}`, { bucketlistId: bucketlist.id })
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  unlike(like) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .delete(`${likesUrl}${like.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  }
};
