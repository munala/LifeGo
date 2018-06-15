import axios from 'axios';

import handleError from '../Common/api/handelError';
import { removeEmptyFields } from '../../utils';

const userUrl = 'https://bucketlist-node.herokuapp.com/api/user/';
const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  async changePassword({ userId, username, ...user }) {
    instance.defaults.headers.common.token = await localStorage.getItem(
      'token'
    );

    return instance
      .post(`${userUrl}change_password`, removeEmptyFields({ ...user }))
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async changeEmail(user) {
    instance.defaults.headers.common.token = await localStorage.getItem(
      'token'
    );

    return instance
      .post(`${userUrl}change_email`, removeEmptyFields({ ...user }))
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async changeUsername(user) {
    instance.defaults.headers.common.token = await localStorage.getItem(
      'token'
    );

    return instance
      .post(`${userUrl}change_username`, removeEmptyFields({ ...user }))
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async getProfile() {
    instance.defaults.headers.common.token = await localStorage.getItem(
      'token'
    );

    return instance
      .get(`${userUrl}get_profile`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async updateProfile(prof) {
    instance.defaults.headers.common.token = await localStorage.getItem(
      'token'
    );

    const { friends, searchUsers, followers, ...profile } = prof;

    return instance
      .post(`${userUrl}update_profile`, removeEmptyFields({ ...profile }))
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async deleteAccount(user) {
    instance.defaults.headers.common.token = await localStorage.getItem(
      'token'
    );

    return instance
      .post(`${userUrl}delete_account`, removeEmptyFields({ ...user }))
      .then(response => response.data)
      .catch(error => handleError(error));
  }
};
