import * as types from './constants';
import userService from './api';
import * as apiCallActions from '../Common/actions/apiCallActions';

export const changeEmailSuccess = (message, screen) => ({
  type: types.CHANGE_EMAIL_SUCCESS,
  message,
  screen
});

export const changePasswordSuccess = (message, screen) => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  message,
  screen
});

export const changeUsernameSuccess = (message, screen) => ({
  type: types.CHANGE_USERNAME_SUCCESS,
  message,
  screen
});

export const getProfileSuccess = ({ profile, screen }) => ({
  type: types.GET_PROFILE_SUCCESS,
  profile,
  message: '',
  screen
});

export const updateProfileSuccess = ({ profile, screen }) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  profile,
  message: 'Success',
  screen
});

export const deleteAccountSuccess = (message, screen) => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
  message,
  screen
});

export const changeEmail = user => async dispatch => {
  const response = await userService.changeEmail(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        ...response,
        screen: 'settings'
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    localStorage.setItem('token', response.token);

    dispatch(changeEmailSuccess(response.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const changePassword = user => async dispatch => {
  const response = await userService.changePassword(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        ...response,
        screen: 'settings'
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    localStorage.setItem('token', response.token);

    dispatch(changePasswordSuccess(response.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const changeUsername = user => async dispatch => {
  const response = await userService.changeUsername(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        ...response,
        screen: 'settings'
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    localStorage.setItem('token', response.token);

    dispatch(changeUsernameSuccess(response.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const getProfile = () => async dispatch => {
  dispatch(apiCallActions.beginApiCall({ screen: 'profile' }));

  const response = await userService.getProfile();

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        screen: 'profile',
        error: response.error
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(
      getProfileSuccess({
        profile: response,
        screen: 'profile'
      })
    );

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateProfile = (profile, screen) => async dispatch => {
  dispatch(apiCallActions.beginApiCall({ screen }));

  const response = await userService.updateProfile(profile);

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        screen,
        error: response.error
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateProfileSuccess({ profile, screen }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteAccount = user => async dispatch => {
  const response = await userService.deleteAccount(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        ...response,
        screen: 'settings'
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteAccountSuccess(response.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
