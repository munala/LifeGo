import { SEARCH_USERS, SEARCH_BUCKETLISTS, CLEAR_SEARCH } from './constants';
import userService from '../Profile/api';
import bucketlistService from '../Common/api/bucketlistApi';
import * as apiCallActions from '../Common/actions/apiCallActions';

export const searchUsersSuccess = ({ users, searchText }) => ({
  type: SEARCH_USERS,
  users,
  searchText,
  message: '',
  screen: 'searchResults',
});

export const searchBucketlistsSuccess = ({ bucketlists, searchText }) => ({
  type: SEARCH_BUCKETLISTS,
  bucketlists,
  searchText,
  message: '',
  screen: 'searchResults',
});

export const clearSearchSuccess = () => ({
  type: CLEAR_SEARCH,
});

export const searchUsers = name => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'searchResults' }));
  dispatch(clearSearchSuccess());
  const { users, error } = await userService.searchUsers(name);

  if (error) {
    dispatch(apiCallActions.apiCallError({ screen: 'searchResults', error }));
  } else {
    dispatch(searchUsersSuccess({ users, searchText: name }));
  }

  return ({ users });
};

export const searchBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'searchResults' }));

  const { bucketlists, error } = await bucketlistService.getAllBucketlists(
    offset,
    limit,
    search,
  );

  if (error) {
    dispatch(apiCallActions.apiCallError({ screen: 'searchResults', error }));
  } else {
    dispatch(clearSearchSuccess());
    dispatch(searchBucketlistsSuccess({ bucketlists, searchText: search }));
  }
  return ({ bucketlists });
};

export const clearSearch = () => (dispatch) => {
  dispatch(clearSearchSuccess);
};
