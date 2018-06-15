import * as types from './constants';

export default (state = [], action) => {
  switch (action.type) {
    case types.NEW_NOTIFICATION:
      return [action.notification, ...state];

    case types.GET_NOTIFICATIONS:
      return action.notifications;

    case types.EDIT_NOTIFICATION:
      return [...state].map((notification) => {
        if (notification.id === action.notification.id) {
          return action.notification;
        }

        return notification;
      });

    case types.DELETE_NOTIFICATION:
      return [...state].filter(notification => notification.id !== action.notification.id);

    default:
      return state;
  }
};
