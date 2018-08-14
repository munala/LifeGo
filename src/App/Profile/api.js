import { sendGraphQLRequest } from '../../utils/api';
import { removeEmptyFields } from '../../utils';
import { profileFields, responseMessageFields, userFields } from '../Common/fields';

export default {
  getProfile: async () => {
    const queryData = {
      mutation: 'getProfile',
      fields: profileFields,
    };

    return sendGraphQLRequest(queryData);
  },

  getOtherProfile: async (id) => {
    const args = { id };

    const queryData = {
      args,
      mutation: 'getOtherProfile',
      fields: profileFields,
    };

    return sendGraphQLRequest(queryData);
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

    return sendGraphQLRequest(queryData);
  },

  addFriend: async (friend) => {
    const queryData = {
      args: { id: friend.id },
      mutation: 'addFriend',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },

  removeFriend: async (friend) => {
    const queryData = {
      args: { id: friend.id },
      mutation: 'removeFriend',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },

  searchUsers: async (name) => {
    const queryData = {
      args: { name },
      mutation: 'searchUsers',
      fields: userFields,
    };

    return sendGraphQLRequest(queryData);
  },
};
