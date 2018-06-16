import * as types from '../constants';

export const beginApiCall = ({ screen }) => ({
  type: types.BEGIN_API_CALL,
  screen,
});

export const apiCallError = ({ screen, error }) => ({
  type: types.API_CALL_ERROR,
  error,
  screen,
});

export const resetMessage = () => ({
  type: types.RESET_MESSAGE,
});

export const resetError = () => ({
  type: types.RESET_ERROR,
});
