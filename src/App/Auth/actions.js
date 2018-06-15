import * as types from './constants';
import userService from './api';
import * as apiCallActions from '../Common/actions/apiCallActions';
import { stripHtml } from '../utils';

export const loginSuccess = ({ token, screen }) => ({
  type: types.LOGIN_SUCCESS,
  token,
  message: '',
  screen
});

export const registerSuccess = ({ screen }) => ({
  type: types.REGISTER_SUCCESS,
  message: 'Successfully registered',
  screen
});

export const resetPasswordSuccess = ({ message, screen }) => ({
  type: types.RESET_PASSWORD_SUCCESS,
  message,
  screen
});

export const logoutUser = () => ({
  type: types.LOGOUT
});

const loginUser = (user, serviceCall) => async dispatch => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));

  const response = await serviceCall(user);

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        screen: 'user',
        error: response.error
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    await localStorage.setItem('token', response);
    await localStorage.setItem('start', 'false');

    await dispatch(
      loginSuccess({
        response,
        screen: 'user'
      })
    );

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const login = user => loginUser(user, userService.loginUser);

export const socialLogin = user => loginUser(user, userService.socialLogin);

export const logout = () => async dispatch => {
  await localStorage.setItem('can_login', 'false');
  await localStorage.removeItem('token');

  await dispatch(logoutUser());
};

export const register = user => async dispatch => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));

  const response = await userService.registerUser(user);

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        screen: 'user',
        error: response.error
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(registerSuccess({ screen: 'user' }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const resetPassword = email => async dispatch => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));

  const response = await userService.resetPassword(email);

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        screen: 'user',
        error: response.error
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(
      resetPasswordSuccess({
        screen: 'user',
        message: stripHtml(response.message)
      })
    );

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
