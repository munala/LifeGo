import * as types from './constants';

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return { ...action.profile, searchUsers: [] };

    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...action.profile,
        friends: state.friends,
        followers: state.followers,
        searchUsers: state.searchUsers
      };

    default:
      return state;
  }
};
