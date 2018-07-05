import { SEARCH_USERS, SEARCH_BUCKETLISTS, CLEAR_SEARCH } from './constants';

const initialState = {
  bucketlists: [],
  users: [],
  searchText: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        searchText: action.searchText,
        users: action.users,
      };

    case SEARCH_BUCKETLISTS:
      return {
        ...state,
        searchText: action.searchText,
        bucketlists: action.bucketlists,
      };

    case CLEAR_SEARCH:
      return initialState;

    default:
      return state;
  }
};
