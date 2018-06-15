import sendRequest from '../../utils/api';
import profileActions from '../Profile/api';
import { removeEmptyFields } from '../../utils';

const userUrl = `${process.env.REACT_APP_API_HOST}/api/user/`;

const { updateProfile } = profileActions;

export default {
  updateProfile,

  changePassword: async ({ userId, username, ...user }) => sendRequest({
    method: 'post',
    url: `${userUrl}change_password`,
    data: removeEmptyFields(user),
  }),

  changeEmail: async user => sendRequest({
    method: 'post',
    url: `${userUrl}change_email`,
    data: removeEmptyFields(user),
  }),

  changeUsername: async user => sendRequest({
    method: 'post',
    url: `${userUrl}change_username`,
    data: removeEmptyFields(user),
  }),

  getProfile: async user => sendRequest({
    method: 'get',
    url: `${userUrl}get_profile`,
  }),

  deleteAccount: async user => sendRequest({
    method: 'post',
    url: `${userUrl}delete_account`,
    data: removeEmptyFields(user),
  }),
};
