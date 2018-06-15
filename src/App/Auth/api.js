import { removeEmptyFields } from '../../utils';
import sendRequest from '../../utils/api';

const userUrl = `${process.env.REACT_APP_API_HOST}/api/user/`;

export default {
  loginUser: async (uSer) => {
    const { confirm, displayName, ...user } = uSer;

    return sendRequest({
      method: 'post',
      url: `${userUrl}login`,
      data: removeEmptyFields(user),
    });
  },

  socialLogin: async user => sendRequest({
    method: 'post',
    url: `${userUrl}social_login`,
    data: removeEmptyFields(user),
  }),

  registerUser: async user => sendRequest({
    method: 'post',
    url: `${userUrl}register`,
    data: removeEmptyFields(user),
  }),

  resetPassword: async email => sendRequest({
    method: 'post',
    url: `${userUrl}reset_password`,
    data: { email },
  }),
};
