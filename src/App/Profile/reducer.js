import * as types from './constants';

export default (state = {
  searchUsers: [],
  friends: [],
  followers: [],
  otherProfile: {
    searchUsers: [],
    friends: [],
    followers: [],
  },
}, action) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return {
        ...action.profile,
        searchUsers: [],
        otherProfile: {},
      };

    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...action.profile,
        friends: state.friends,
        followers: state.followers,
        searchUsers: state.searchUsers,
      };

    case types.ADD_FRIEND:
      return {
        ...state,
        friends: [action.friend, ...state.friends],
      };

    case types.ADD_FOLLOWER:
      return {
        ...state,
        followers: [action.follower, ...state.followers],
      };

    case types.REMOVE_FRIEND:
      return {
        ...state,
        friends: [...state.friends].filter(friend => friend.id !== action.friend.id),
      };

    case types.REMOVE_FOLLOWER:
      return {
        ...state,
        followers: [...state.followers].filter(follower => follower.id !== action.follower.id),
      };

    case types.SEARCH_USERS:
      return {
        ...state,
        searchUsers: action.users.filter(user => user.id !== state.id),
      };

    case types.DELETE_ACCOUNT_SUCCESS:
      return {};

    case types.LOGOUT:
      return {};

    default:
      return state;
  }
};
