import * as types from '../constants';

describe('Constants tests', () => {
  it('asserts constants', () => {
    expect(types.GET_ALERTS).toEqual('GET_ALERTS');
    expect(types.NEW_ALERT).toEqual('NEW_ALERT');
    expect(types.EDIT_ALERT).toEqual('EDIT_ALERT');
    expect(types.DELETE_ALERT).toEqual('DELETE_ALERT');
  });
});
