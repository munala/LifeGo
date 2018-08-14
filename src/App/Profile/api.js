import sendRequest from '../../utils/api';
import { removeEmptyFields, generateQuery } from '../../utils';
import { profileFields, responseMessageFields, userFields } from '../Common/fields';

const url = `${process.env.REACT_APP_API_HOST}/api/graphql`;

export default {
  getProfile: async () => {
    const queryData = {
      mutation: 'getProfile',
      fields: profileFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  getOtherProfile: async (id) => {
    const args = { id };

    const queryData = {
      args,
      mutation: 'getOtherProfile',
      fields: profileFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  updateProfile: async ({
    displayName,
    pictureUrl,
    privacy,
    reminders,
  }) => {
    const args = removeEmptyFields({
      displayName,
      pictureUrl,
      privacy,
      reminders,
    });

    const queryData = {
      args,
      mutation: 'updateProfile',
      fields: profileFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  addFriend: async (friend) => {
    const queryData = {
      args: { id: friend.id },
      mutation: 'addFriend',
      fields: responseMessageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  removeFriend: async (friend) => {
    const queryData = {
      args: { id: friend.id },
      mutation: 'removeFriend',
      fields: responseMessageFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },

  searchUsers: async (name) => {
    const queryData = {
      args: { name },
      mutation: 'searchUsers',
      fields: userFields,
    };

    const query = generateQuery(queryData);

    return sendRequest({
      method: 'post',
      url,
      data: { query },
    });
  },
};
