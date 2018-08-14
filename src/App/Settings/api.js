import sendRequest from '../../utils/api';
import profileActions from '../Profile/api';
import { removeEmptyFields, generateQuery } from '../../utils';
import {
  responseMessageFields,
} from '../Common/fields';

const userUrl = `${process.env.REACT_APP_API_HOST}/api/auth/`;
const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

const { updateProfile, getProfile } = profileActions;

export default {
  updateProfile,
  getProfile,

  changePassword: async data => sendRequest({
    method: 'post',
    url: `${userUrl}change_password`,
    data,
  }),

  changeEmail: async data => sendRequest({
    method: 'post',
    url: `${userUrl}change_email`,
    data,
  }),

  changeUsername: async user => sendRequest({
    method: 'post',
    url: `${userUrl}change_username`,
    data: removeEmptyFields(user),
  }),

  deleteAccount: async ({ email, password }) => {
    const queryData = {
      args: {
        email,
        password,
      },
      mutation: 'deleteAccount',
      fields: responseMessageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },
};
