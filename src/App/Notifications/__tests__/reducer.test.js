import notificationReducer from '../reducer';
import * as actions from '../actions';

const initialState = [];

describe('Notifications reducer', () => {
  it('should getNotifications', () => {
    const action = actions.getNotificationsSuccess({ notifications: [{ read: false }] });
    const newState = notificationReducer(initialState, action);

    expect(newState).toEqual([{ read: false }]);
  });

  it('should newNotification', () => {
    const action = actions.newNotification({ notification: { read: false } });
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual([{ read: false }]);
  });

  it('should markAsRead', () => {
    const action = actions.markAsReadSuccess({ read: true, id: 1 });
    const newState = notificationReducer([{ read: false, id: 1 }], action);
    expect(newState).toEqual([{ read: true, id: 1 }]);
  });

  it('should deleteNotification', () => {
    const action = actions.deleteNotificationSuccess({ read: true, id: 1 });
    const newState = notificationReducer([{ read: true, id: 1 }], action);
    expect(newState).toEqual(initialState);
  });
});
