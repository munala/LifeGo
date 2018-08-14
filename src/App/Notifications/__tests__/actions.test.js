import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as notificationActions from '../actions';
import * as notificationConstants from '../constants';
import * as commonConstants from '../../Common/constants';

const types = { ...commonConstants, ...notificationConstants };

jest.mock('../api', (() => ({
  getNotifications: () => Promise.resolve({
    data: {
      getNotifications: [],
    },
  }),
  markAsRead: () => Promise.resolve({ data: { markAsRead: {} } }),
  deleteNotification: () => Promise.resolve({ data: { deleteNotification: {} } }),
})));

describe('Chat action creators', () => {
  it('should create a GET_NOTIFICATIONS action', () => {
    const data = {
      notifications: [],
      screen: 'notifications',
    };
    const expectedAction = {
      ...data,
      type: types.GET_NOTIFICATIONS,
      message: '',
    };

    const action = notificationActions.getNotificationsSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a EDIT_NOTIFICATION action', () => {
    const data = {
      content: 'oliver',
    };

    const expectedAction = {
      notification: data,
      type: types.EDIT_NOTIFICATION,
      message: '',
    };

    const action = notificationActions.markAsReadSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a DELETE_NOTIFICATION action', () => {
    const data = {
      content: 'oliver',
    };

    const expectedAction = {
      notification: data,
      type: types.DELETE_NOTIFICATION,
      message: '',
    };

    const action = notificationActions.deleteNotificationSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a NEW_NOTIFICATION action', () => {
    const data = {
      notification: {
        content: 'oliver',
      },
    };
    const expectedAction = {
      ...data,
      type: types.NEW_NOTIFICATION,
      message: '',
    };

    const action = notificationActions.newNotification((data));

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
    'GET_NOTIFICATIONS',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.GET_NOTIFICATIONS,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(notificationActions.getNotifications(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.GET_NOTIFICATIONS);
        done();
      });
    },
  );
  it(
    'EDIT_NOTIFICATION',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.EDIT_NOTIFICATION,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(notificationActions.markNotificationAsRead(expectedActions[1].body))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.EDIT_NOTIFICATION);
          done();
        });
    },
  );
  it(
    'DELETE_NOTIFICATION when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.DELETE_NOTIFICATION,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(notificationActions.deleteNotification(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.DELETE_NOTIFICATION);
        done();
      });
    },
  );
});
