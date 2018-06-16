import * as apiCallActions from '../actions/apiCallActions';
import * as types from '../constants';


describe('Api call actions tests', () => {
  it('should begin api call', () => {
    const action = apiCallActions.beginApiCall({ screen: 'login' });
    expect(action.type).toEqual(types.BEGIN_API_CALL);
  });

  it('should throw api call error', async () => {
    const action = apiCallActions.apiCallError({ screen: 'login', error: 'invalid' });
    expect(action.type).toEqual(types.API_CALL_ERROR);
    expect(action.error).toEqual('invalid');
  });
});
