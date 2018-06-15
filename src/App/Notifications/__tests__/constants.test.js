import * as types from '../constants';

describe('Constants tests', () => {
  it('asserts constants', () => {
    expect(types.GET_NOTIFICATIONS).toEqual('GET_NOTIFICATIONS');
    expect(types.EDIT_NOTIFICATION).toEqual('EDIT_NOTIFICATION');
    expect(types.DELETE_NOTIFICATION).toEqual('DELETE_NOTIFICATION');
    expect(types.NEW_NOTIFICATION).toEqual('NEW_NOTIFICATION');
  });
});
