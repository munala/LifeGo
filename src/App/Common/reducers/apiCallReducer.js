import * as types from '../constants';

const initialState = {
  user: 0,
  allBucketlists: 0,
  myBucketlists: 0,
  notifications: 0,
  messages: 0,
  userAlerts: 0,
  profile: 0,
  settings: 0,
  others: 0,
  loader: 0
};

function actionTypeEndsInSuccess(actionType) {
  return actionType.substring(actionType.length - 8) === '_SUCCESS';
}

export default function apiCallReducer(state = initialState, action) {
  const screen = action.screen || 'others';
  if (action.type === types.BEGIN_API_CALL) {
    return {
      ...state,
      [screen]: state[screen] + 1
    };
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return {
      ...state,
      [screen]: state[screen] - 1
    };
  }
  return state;
}
