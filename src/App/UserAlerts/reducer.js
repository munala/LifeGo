import * as types from './constants';

export default (state = [], action) => {
  switch (action.type) {
    case types.NEW_ALERT:
      return [action.alert, ...state];

    case types.GET_ALERTS:
      return action.alerts;

    case types.EDIT_ALERT:
      return [...state].map((alert) => {
        if (alert.id === action.alert.id) {
          return action.alert;
        }
        return alert;
      });

    case types.DELETE_ALERT:
      return [...state].filter(alert => alert.id !== action.alert.id);

    default:
      return state;
  }
};
