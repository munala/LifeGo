import sendRequest from '../../utils/api';
import { removeEmptyFields } from '../../utils';

const userUrl = `${process.env.REACT_APP_API_HOST}/api/user/`;

export default {
  getProfile: async () => sendRequest({
    method: 'get',
    url: `${userUrl}get_profile`,
  }),

  getOtherProfile: async id => sendRequest({
    method: 'get',
    url: `${userUrl}get_other_profile/${id}`,
  }),

  updateProfile: async ({
    friends,
    searchUsers,
    followers,
    ...profile
  }) => sendRequest({
    method: 'post',
    url: `${userUrl}update_profile`,
    data: removeEmptyFields(profile),
  }),

  searchUsers: async name => sendRequest({
    method: 'get',
    url: `${userUrl}users?name=${name}`,
  }),

  addFriend: async friend => sendRequest({
    method: 'post',
    url: `${userUrl}add_friend`,
    data: friend,
  }),

  removeFriend: async friend => sendRequest({
    method: 'delete',
    url: `${userUrl}remove_friend/${friend.id}`,
  }),
};
