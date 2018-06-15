import axios from 'axios';

import handleError from '../Common/api/handelError';
import { removeEmptyFields } from '../../utils';

const userUrl = `${process.env.REACT_APP_API_HOST}/api/user/`;
const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  loginUser(uSer) {
    const { confirm, displayName, ...user } = uSer;

    return instance
      .post(`${userUrl}login`, removeEmptyFields({ ...user }))
      .then(response => response.data.token)
      .catch(error => handleError(error));
  },

  socialLogin(user) {
    return instance
      .post(`${userUrl}social_login`, removeEmptyFields({ ...user }))
      .then(response => response.data.token)
      .catch(error => handleError(error));
  },

  registerUser(user) {
    return instance
      .post(`${userUrl}register`, removeEmptyFields({ ...user }))
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  resetPassword(email) {
    return instance
      .post(`${userUrl}reset_password`, { email })
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
