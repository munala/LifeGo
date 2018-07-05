import * as types from './constants';
import userService from './api';
import * as apiCallActions from '../Common/actions/apiCallActions';

export const getProfileSuccess = ({ profile, screen }) => ({
  type: types.GET_PROFILE_SUCCESS,
  profile,
  message: '',
  screen,
});

export const getOtherProfileSuccess = ({ profile, screen }) => ({
  type: types.GET_OTHER_PROFILE_SUCCESS,
  profile,
  message: '',
  screen,
});

export const updateProfileSuccess = ({ profile, screen }) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  profile,
  message: 'Success',
  screen,
});

export const addFriendSuccess = ({ message, friend }) => ({
  type: types.ADD_FRIEND,
  message,
  friend,
  screen: 'others',
});

export const removeFriendSuccess = ({ message }, friend) => ({
  type: types.REMOVE_FRIEND,
  message,
  friend,
  screen: 'others',
});

export const removeFollower = follower => ({
  type: types.REMOVE_FOLLOWER,
  message: '',
  follower,
});

export const addFollower = follower => ({
  type: types.ADD_FOLLOWER,
  message: '',
  follower,
});

export const getProfile = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'profile' }));

  const response = await userService.getProfile();

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'profile',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getProfileSuccess({
      profile: response,
      screen: 'profile',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const getOtherProfile = id => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'profile' }));

  const response = await userService.getOtherProfile(id);

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'profile',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getOtherProfileSuccess({
      profile: response,
      screen: 'profile',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateProfile = (profile, screen) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen }));

  const response = await userService.updateProfile(profile);

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen,
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateProfileSuccess({ profile: response.profile, screen }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const addFriend = user => async (dispatch) => {
  const response = await userService.addFriend(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(addFriendSuccess(response, 'others'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const removeFriend = user => async (dispatch) => {
  const response = await userService.removeFriend(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(removeFriendSuccess(response, user, 'others'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
