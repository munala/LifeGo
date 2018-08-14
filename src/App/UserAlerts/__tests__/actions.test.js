import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as userAlertActions from '../actions';
import * as userAlertConstants from '../constants';
import * as commonConstants from '../../Common/constants';

const types = { ...commonConstants, ...userAlertConstants };

jest.mock('../api', (() => ({
  getAlerts: () => Promise.resolve({
    data: {
      getUserNotifications: [],
    },
  }),
  markAsRead: () => Promise.resolve({ data: { markAsRead: {} } }),
  deleteAlert: () => Promise.resolve({ data: { deleteUserNotification: {} } }),
})));

describe('Chat action creators', () => {
  it('should create a GET_ALERTS action', () => {
    const data = {
      alerts: [],
      screen: 'userAlerts',
    };
    const expectedAction = {
      ...data,
      type: types.GET_ALERTS,
      message: '',
    };

    const action = userAlertActions.getAlertsSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a EDIT_ALERT action', () => {
    const data = {
      content: 'oliver',
    };

    const expectedAction = {
      alert: data,
      screen: 'userAlerts',
      type: types.EDIT_ALERT,
      message: '',
    };

    const action = userAlertActions.markAsReadSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a DELETE_ALERT action', () => {
    const data = {
      content: 'oliver',
    };

    const expectedAction = {
      alert: data,
      screen: 'userAlerts',
      type: types.DELETE_ALERT,
      message: '',
    };

    const action = userAlertActions.deleteAlertSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a NEW_ALERT action', () => {
    const data = {
      alert: {
        content: 'oliver',
      },
    };
    const expectedAction = {
      ...data,
      type: types.NEW_ALERT,
      message: '',
    };

    const action = userAlertActions.newAlert((data));

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async calls', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(
    'GET_ALERTS',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.GET_ALERTS,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(userAlertActions.getAlerts(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.GET_ALERTS);
        done();
      });
    },
  );
  it(
    'EDIT_ALERT',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.EDIT_ALERT,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(userAlertActions.markAlertAsRead(expectedActions[1].body))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.EDIT_ALERT);
          done();
        });
    },
  );
  it(
    'DELETE_ALERT when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.DELETE_ALERT,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(userAlertActions.deleteAlert(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.DELETE_ALERT);
        done();
      });
    },
  );
});
