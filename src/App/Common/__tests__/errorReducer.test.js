import errorReducer from '../reducers/errorReducer';
import { apiCallError } from '../actions/apiCallActions';
import { logout } from '../../Auth/actions';

const initialState = '';

describe('Error reducer', () => {
  it('should set error API_CALL_ERROR', () => {
    const action = apiCallError({ error: 'oliver', screen: 'error' });
    const newState = errorReducer(initialState, action);
    expect(newState).toEqual('oliver');
  });

  it('should clear error on RESET_ERROR', () => {
    const action = { type: 'RESET_ERROR' };
    const newState = errorReducer(initialState, action);
    expect(newState).toEqual('');
  });

  it('should clear error on LOGOUT', () => {
    const action = logout();
    const newState = errorReducer(initialState, action);
    expect(newState).toEqual('');
  });
});
