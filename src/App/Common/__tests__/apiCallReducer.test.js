import apiCallReducer from '../reducers/apiCallReducer';
import * as actions from '../actions/apiCallActions';

const initialState = {
  user: 0,
  allBucketlists: 0,
  myBucketlists: 0,
  notifications: 0,
  messages: 0,
  userAlerts: 0,
  profile: 0,
  settings: 0,
  others: 0,
  loader: 0,
};

describe('Api call reducer', () => {
  it('should increase currentApiCalls on BEGIN_API_CALL', () => {
    const action = actions.beginApiCall({ screen: 'user' });
    const newState = apiCallReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      user: 1,
    });
  });

  it('should reduce currentApiCalls on API_CALL_ERROR', () => {
    const action = actions.apiCallError({ screen: 'user' });
    const newState = apiCallReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      user: -1,
    });
  });
});
