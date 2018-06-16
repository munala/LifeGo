import messageReducer from '../reducers/messageReducer';
import { createBucketlistSuccess } from '../actions/bucketlistActions';

const initialState = '';

describe('Message reducer', () => {
  it('should set message on any _SUCCESS', () => {
    const action = createBucketlistSuccess({ name: 'oliver' });
    const newState = messageReducer(initialState, action);
    expect(newState).toEqual('');
  });

  it('should clear error on RESET_MESSAGE', () => {
    const action = { type: 'RESET_MESSAGE' };
    const newState = messageReducer(initialState, action);
    expect(newState).toEqual('');
  });
});
