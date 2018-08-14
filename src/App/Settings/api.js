import sendRequest, { sendGraphQLRequest } from '../../utils/api';
import profileActions from '../Profile/api';
import { removeEmptyFields } from '../../utils';
import {
  responseMessageFields,
} from '../Common/fields';

const userUrl = `${process.env.REACT_APP_API_HOST}/api/auth/`;

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

    return sendGraphQLRequest(queryData);
  },
};
