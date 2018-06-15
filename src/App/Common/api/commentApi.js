import axios from 'axios';
import handleError from './handelError';

const commentsUrl = 'http://localhost:3002/api/comments/';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  addComment(bucketlist, comment) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .post(`${commentsUrl}${bucketlist.id.toString()}`, {
        content: comment.content,
        bucketlistId: bucketlist.id
      })
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  updateComment(comment) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .put(`${commentsUrl}${comment.id.toString()}`, {
        content: comment.content
      })
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  deleteComment(comment) {
    instance.defaults.headers.common.token = localStorage.getItem('token');

    return instance
      .delete(`${commentsUrl}${comment.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  }
};
