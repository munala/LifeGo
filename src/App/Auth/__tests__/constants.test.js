import * as types from '../constants';

describe('Constants tests', () => {
  it('asserts constants', () => {
    expect(types.RESET_PASSWORD).toEqual('RESET_PASSWORD');
    expect(types.LOGIN_SUCCESS).toEqual('LOGIN_SUCCESS');
    expect(types.REGISTER_SUCCESS).toEqual('REGISTER_SUCCESS');
    expect(types.LOGOUT).toEqual('LOGOUT');
  });
});
