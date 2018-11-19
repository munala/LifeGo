import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as authActions from '../actions';
import * as authConstants from '../constants';
import * as commonConstants from '../../Common/constants';

const registeredUser = {
  username: 'mimi',
  email: 'mimi',
  password: 'mimi',
  confirm: 'mimi',
};
const user = {
  username: 'mimi',
  password: 'mimi',
};

const types = { ...authConstants, ...commonConstants };

jest.mock('../api', (() => ({
  loginUser: () => Promise.resolve({ token: 'dfknefenfiefnef' }),
  socialLogin: () => Promise.resolve({ token: 'dfknefenfiefnef' }),
  registerUser: () => Promise.resolve('dfknefenfiefnef'),
  resetPassword: () => Promise.resolve({ message: 'dfknefenfiefnef' }),
})));

describe('Auth actions', () => {
  it('should create a LOGIN_SUCCESS action', async () => {
    const data = {
      token: 'oliver',
      screen: 'login',
    };
    const expectedAction = {
      ...data,
      message: '',
      type: types.LOGIN_SUCCESS,
    };

    const action = authActions.loginSuccess(data);

    expect(action).toEqual(expectedAction);
  });

  it('should create a REGISTER_SUCCESS action', () => {
    const expectedAction = {
      type: types.REGISTER_SUCCESS,
      message: 'Successfully registered',
    };

    const action = authActions.registerSuccess('Successfully registered');

    expect(action).toEqual(expectedAction);
  });

  it('should create a LOGOUT action', () => {
    const expectedAction = {
      type: types.LOGOUT,
    };

    const action = authActions.logoutUser();

    expect(action).toEqual(expectedAction);
  });

  it('should create a RESET_PASSWORD_SUCCESS action', () => {
    const data = {
      message: 'oliver',
      screen: 'login',
    };
    const expectedAction = {
      ...data,
      type: types.RESET_PASSWORD_SUCCESS,
    };

    const action = authActions.resetPasswordSuccess(data);

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async calls', () => {
  it(
    'LOGIN_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.LOGIN_SUCCESS,
          body: { loggedIn: true, token: 'oliver' },
        },
      ];

      const store = mockStore({ loggedIn: true, user, expectedActions });
      store.dispatch(authActions.login(user)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.LOGIN_SUCCESS);
        done();
      });
    },
  );

  it(
    'LOGIN_SUCCESS when logging in from social',
    () => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.LOGIN_SUCCESS,
          body: { loggedIn: true, token: 'oliver' },
        },
      ];

      const store = mockStore({ loggedIn: true, user, expectedActions });
      store.dispatch(authActions.socialLogin('oliver'));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
      expect(actions[1].type).toEqual(types.LOGIN_SUCCESS);
    },
  );

  it(
    'REGISTER_SUCCESS when registering',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.REGISTER_SUCCESS,
          body: { message: 'oliver' },
        },
      ];

      const store = mockStore({ message: 'oliver', user: registeredUser, expectedActions });
      store.dispatch(authActions.register(registeredUser)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.REGISTER_SUCCESS);
        done();
      });
    },
  );

  it(
    'RESET_PASSWORD when resetting password',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.RESET_PASSWORD_SUCCESS,
          body: { message: 'oliver' },
        },
      ];

      const store = mockStore({ message: 'oliver', user: registeredUser, expectedActions });
      store.dispatch(authActions.resetPassword('email')).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.RESET_PASSWORD_SUCCESS);
        done();
      });
    },
  );
});
