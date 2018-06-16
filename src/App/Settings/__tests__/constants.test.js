import * as types from '../constants';

describe('Constants tests', () => {
  it('asserts constants', () => {
    expect(types.CHANGE_PASSWORD_SUCCESS).toEqual('CHANGE_PASSWORD_SUCCESS');
    expect(types.CHANGE_USERNAME_SUCCESS).toEqual('CHANGE_USERNAME_SUCCESS');
    expect(types.CHANGE_EMAIL_SUCCESS).toEqual('CHANGE_EMAIL');
    expect(types.CHANGE_PASSWORD).toEqual('CHANGE_PASSWORD');
    expect(types.CHANGE_USERNAME).toEqual('CHANGE_USERNAME');
    expect(types.CHANGE_EMAIL).toEqual('CHANGE_EMAIL');
    expect(types.UPDATE_PROFILE_SUCCESS).toEqual('UPDATE_PROFILE_SUCCESS');
    expect(types.UPDATE_PROFILE).toEqual('UPDATE_PROFILE_SUCCESS');
    expect(types.DELETE_ACCOUNT_SUCCESS).toEqual('DELETE_ACCOUNT_SUCCESS');
  });
});
