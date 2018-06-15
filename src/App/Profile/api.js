import axios from 'axios';

import handleError from '../Common/api/handelError';
import { removeEmptyFields } from '../../utils';

const userUrl = `${process.env.REACT_APP_API_HOST}/api/user/`;

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  async getProfile() {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .get(`${userUrl}get_profile`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async getOtherProfile(id) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .get(`${userUrl}get_other_profile/${id}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async updateProfile(prof) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    const {
      friends, searchUsers, followers, ...profile
    } = prof;

    return instance
      .post(`${userUrl}update_profile`, removeEmptyFields({ ...profile }))
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async searchUsers(name) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .get(`${userUrl}users?name=${name}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async addFriend(friend) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .post(`${userUrl}add_friend`, { ...friend })
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async removeFriend(friend) {
    instance.defaults.headers.common.token = await localStorage.getItem('token');

    return instance
      .delete(`${userUrl}remove_friend/${friend.id}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
