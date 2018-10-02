import * as types from './constants';

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_OTHER_PROFILE_SUCCESS:
      return { ...action.profile, searchUsers: [] };

    default:
      return state;
  }
};
