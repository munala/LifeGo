import alertReducer from '../reducer';
import * as actions from '../actions';

const initialState = [];

describe('UserAlerts reducer', () => {
  it('should getUserAlerts', () => {
    const action = actions.getAlertsSuccess({ alerts: [{ read: false }] });
    const newState = alertReducer(initialState, action);

    expect(newState).toEqual([{ read: false }]);
  });

  it('should newAlert', () => {
    const action = actions.newAlert({ alert: { read: false } });
    const newState = alertReducer(initialState, action);
    expect(newState).toEqual([{ read: false }]);
  });

  it('should markAsRead', () => {
    const action = actions.markAsReadSuccess({ read: true, id: 1 });
    const newState = alertReducer([{ read: false, id: 1 }], action);
    expect(newState).toEqual([{ read: true, id: 1 }]);
  });

  it('should deleteAlert', () => {
    const action = actions.deleteAlertSuccess({ read: true, id: 1 });
    const newState = alertReducer([{ read: true, id: 1 }], action);
    expect(newState).toEqual(initialState);
  });
});
