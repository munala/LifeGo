import authReducer from '../reducer';
import * as actions from '../actions';

const initialState = false;

describe('Auth reducer', () => {
  it('should login user on LOGIN_SUCCESS', () => {
    const action = actions.loginSuccess('oliver');
    const newState = authReducer(initialState, action);

    expect(newState).toEqual(true);
  });

  it('should register user on REGISTER_SUCCESS', () => {
    const action = actions.registerSuccess({ message: 'oliver' });
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should logout user on LOGOUT', () => {
    const action = actions.logout();
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(false);
  });
});
