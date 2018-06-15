import * as types from './constants';

export default function userReducer(state = false, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return true;

    case types.LOGOUT:
      return false;

    case types.REGISTER_SUCCESS:
      return state;

    default:
      return state;
  }
}
