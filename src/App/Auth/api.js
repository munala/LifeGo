import { removeEmptyFields } from '../../utils';
import sendRequest from '../../utils/api';

const userUrl = `${process.env.REACT_APP_API_HOST}/`;

export default {
  loginUser: async (uSer) => {
    const { confirm, displayName, ...user } = uSer;

    return sendRequest({
      method: 'post',
      url: `${userUrl}api/auth/login`,
      data: removeEmptyFields(user),
    });
  },

  registerUser: async user => sendRequest({
    method: 'post',
    url: `${userUrl}api/auth/register`,
    data: removeEmptyFields(user),
  }),

  resetPassword: async email => sendRequest({
    method: 'post',
    url: `${userUrl}api/auth/reset_password`,
    data: { email },
  }),
};
