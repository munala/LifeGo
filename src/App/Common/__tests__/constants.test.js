import * as types from '../constants';

describe('Constants tests', () => {
  it('asserts constants', () => {
    expect(types.LOAD_BUCKETLISTS_SUCCESS).toEqual('LOAD_BUCKETLISTS_SUCCESS');
    expect(types.LOAD_MORE_ALL_BUCKETLISTS).toEqual('LOAD_MORE_ALL_BUCKETLISTS');
    expect(types.CREATE_BUCKETLIST_SUCCESS).toEqual('CREATE_BUCKETLIST_SUCCESS');
    expect(types.UPDATE_BUCKETLIST_SUCCESS).toEqual('UPDATE_BUCKETLIST_SUCCESS');
    expect(types.DELETE_BUCKETLIST_SUCCESS).toEqual('DELETE_BUCKETLIST_SUCCESS');
    expect(types.CREATE_ITEM_SUCCESS).toEqual('CREATE_ITEM_SUCCESS');
    expect(types.UPDATE_ITEM_SUCCESS).toEqual('UPDATE_ITEM_SUCCESS');
    expect(types.DELETE_ITEM_SUCCESS).toEqual('DELETE_ITEM_SUCCESS');
    expect(types.ADD_COMMENT).toEqual('ADD_COMMENT');
    expect(types.EDIT_COMMENT).toEqual('EDIT_COMMENT');
    expect(types.DELETE_COMMENT).toEqual('DELETE_COMMENT');
    expect(types.LIKE).toEqual('LIKE');
    expect(types.UNLIKE).toEqual('UNLIKE');
    expect(types.ADD_NEW_BUCKETLIST).toEqual('ADD_NEW_BUCKETLIST');
    expect(types.LOAD_MORE_BUCKETLISTS).toEqual('LOAD_MORE_BUCKETLISTS');
    expect(types.BEGIN_API_CALL).toEqual('BEGIN_API_CALL');
    expect(types.API_CALL_ERROR).toEqual('API_CALL_ERROR');
    expect(types.RESET_ERROR).toEqual('RESET_ERROR');
    expect(types.RESET_MESSAGE).toEqual('RESET_MESSAGE');
    expect(types.LOGOUT).toEqual('LOGOUT');
  });
});
