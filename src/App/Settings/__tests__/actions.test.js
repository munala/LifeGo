import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as settingsActions from '../actions';
import * as settingsConstants from '../constants';
import * as commonConstants from '../../Common/constants';

const types = { ...settingsConstants, ...commonConstants };

jest.mock('../api', (() => ({
  updateProfile: () => Promise.resolve('dfknefenfiefnef'),
  getProfile: () => Promise.resolve({}),
  changePassword: () => Promise.resolve({ token: 'dfknefenfiefnef' }),
  changeEmail: () => Promise.resolve({ token: 'dfknefenfiefnef' }),
  changeUsername: () => Promise.resolve({ token: 'dfknefenfiefnef' }),
  deleteAccount: () => Promise.resolve('dfknefenfiefnef'),
})));

describe('Auth actions', () => {
  it('should create a GET_PROFILE_SUCCESS action', () => {
    const data = {
      profile: {
        name: 'oliver',
        email: 'login',
      },
      screen: 'settings',
    };

    const expectedAction = {
      ...data,
      type: types.GET_PROFILE_SUCCESS,
      message: '',
      screen: 'settings',
    };

    const action = settingsActions.getProfileSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a CHANGE_EMAIL_SUCCESS action', () => {
    const data = {
      message: 'success',
    };

    const expectedAction = {
      ...data,
      screen: 'settings',
      type: types.CHANGE_EMAIL_SUCCESS,
    };

    const action = settingsActions.changeEmailSuccess(data.message, 'settings');

    expect(action).toEqual(expectedAction);
  });
  it('should create a CHANGE_PASSWORD_SUCCESS action', () => {
    const data = {
      message: 'success',
    };

    const expectedAction = {
      ...data,
      type: types.CHANGE_PASSWORD_SUCCESS,
      screen: 'settings',
    };

    const action = settingsActions.changePasswordSuccess(data.message, 'settings');

    expect(action).toEqual(expectedAction);
  });
  it('should create a CHANGE_USERNAME_SUCCESS action', () => {
    const data = {
      message: 'success',
    };

    const expectedAction = {
      ...data,
      type: types.CHANGE_USERNAME_SUCCESS,
      screen: 'settings',
    };

    const action = settingsActions.changeUsernameSuccess(data.message, 'settings');

    expect(action).toEqual(expectedAction);
  });
  it('should create a UPDATE_PROFILE_SUCCESS action', () => {
    const data = {
      profile: {
        name: 'oliver',
        email: 'login',
      },
      screen: 'settings',
    };
    const expectedAction = {
      ...data,
      message: 'Success',
      type: types.UPDATE_PROFILE_SUCCESS,
    };

    const action = settingsActions.updateProfileSuccess(data);

    expect(action).toEqual(expectedAction);
  });
  it('should create a DELETE_ACCOUNT_SUCCESS action', () => {
    const data = {
      message: 'success',
    };
    const expectedAction = {
      ...data,
      screen: 'settings',
      type: types.DELETE_ACCOUNT_SUCCESS,
    };

    const action = settingsActions.deleteAccountSuccess('success', 'settings');

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async calls', () => {
  it(
    'GET_PROFILE_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.GET_PROFILE_SUCCESS,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(settingsActions.getProfile()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.GET_PROFILE_SUCCESS);
        done();
      });
    },
  );
  it(
    'CHANGE_EMAIL_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.CHANGE_EMAIL_SUCCESS,
          body: {
            id: 1,
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(settingsActions.changeEmail(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.CHANGE_EMAIL_SUCCESS);
        done();
      });
    },
  );
  it(
    'CHANGE_PASSWORD_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.CHANGE_PASSWORD_SUCCESS,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ otherProfile: {}, expectedActions });
      store.dispatch(settingsActions.changePassword(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.CHANGE_PASSWORD_SUCCESS);
        done();
      });
    },
  );
  it(
    'CHANGE_USERNAME_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.CHANGE_USERNAME_SUCCESS,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(settingsActions.changeUsername(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.CHANGE_USERNAME_SUCCESS);
        done();
      });
    },
  );
  it(
    'UPDATE_PROFILE_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.UPDATE_PROFILE_SUCCESS,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(settingsActions.updateProfile(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.UPDATE_PROFILE_SUCCESS);
        done();
      });
    },
  );
  it(
    'DELETE_ACCOUNT_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.DELETE_ACCOUNT_SUCCESS,
          users: [],
        },
      ];

      const store = mockStore({ searchUsers: [], expectedActions });
      store.dispatch(settingsActions.deleteAccount(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.DELETE_ACCOUNT_SUCCESS);
        done();
      });
    },
  );
});
