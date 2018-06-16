import * as types from '../constants';

describe('Constants tests', () => {
  it('asserts constants', () => {
    expect(types.GET_PROFILE_SUCCESS).toEqual('GET_PROFILE_SUCCESS');
    expect(types.GET_OTHER_PROFILE_SUCCESS).toEqual('GET_OTHER_PROFILE_SUCCESS');
    expect(types.UPDATE_PROFILE_SUCCESS).toEqual('UPDATE_PROFILE_SUCCESS');
    expect(types.GET_PROFILE).toEqual('GET_PROFILE_SUCCESS');
    expect(types.UPDATE_PROFILE).toEqual('UPDATE_PROFILE_SUCCESS');
    expect(types.ADD_FRIEND).toEqual('ADD_FRIEND_SUCCESS');
    expect(types.REMOVE_FRIEND).toEqual('REMOVE_FRIEND_SUCCESS');
    expect(types.REMOVE_FOLLOWER).toEqual('REMOVE_FOLLOWER');
    expect(types.ADD_FOLLOWER).toEqual('ADD_FOLLOWER');
    expect(types.SEARCH_USERS).toEqual('SEARCH_USERS');
    expect(types.DELETE_ACCOUNT_SUCCESS).toEqual('DELETE_ACCOUNT_SUCCESS');
  });
});
