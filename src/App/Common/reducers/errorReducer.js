import * as types from '../constants';

export default (state = '', action) => {
  switch (action.type) {
    case types.API_CALL_ERROR:
      return action.error === state ? state : action.error;

    case types.LOGOUT:
      return '';

    case types.RESET_ERROR:
      return '';

    default:
      return state;
  }
};
