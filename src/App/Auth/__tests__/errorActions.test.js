import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as authActions from '../actions';
import * as types from '../../Common/constants';

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
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

jest.clearAllMocks();
jest.mock('../api', (() => ({
  loginUser: () => Promise.resolve({ error: 'oliver' }),
  registerUser: () => Promise.resolve({ error: 'oliver' }),
})));

describe('Auth action errors', () => {
  it(
    'API_CALL_ERROR when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.API_CALL_ERROR,
          body: { token: 'error' },
        },
      ];

      const store = mockStore({ error: 'oliver', expectedActions });
      store.dispatch(authActions.login(user)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.API_CALL_ERROR);
        done();
      });
    },
  );

  it(
    'API_CALL_ERROR when registering',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.API_CALL_ERROR,
          body: { token: 'error' },
        },
      ];

      const store = mockStore({ error: 'oliver', expectedActions });
      store.dispatch(authActions.register(registeredUser)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.API_CALL_ERROR);
        done();
      });
    },
  );
});
