import * as types from '../constants';

const actionTypeEndsInSuccess = actionType =>
  actionType.substring(actionType.length - 8) === '_SUCCESS';

export default (state = '', action) => {
  if (actionTypeEndsInSuccess(action.type)) {
    return action.message;
  } else if (action.type === types.RESET_MESSAGE) {
    return '';
  }
  return state;
};
