import * as types from '../constants';

describe('Constants tests', () => {
  it('asserts constants', () => {
    expect(types.SEND_MESSAGE).toEqual('SEND_MESSAGE_SUCCESS');
    expect(types.START_CONVERSATION).toEqual('START_CONVERSATION_SUCCESS');
    expect(types.EDIT_MESSAGE).toEqual('EDIT_MESSAGE_SUCCESS');
    expect(types.DELETE_MESSAGE).toEqual('DELETE_MESSAGE_SUCCESS');
    expect(types.DELETE_CONVERSATION_SUCCESS).toEqual('DELETE_CONVERSATION_SUCCESS');
    expect(types.GET_CONVERSATIONS_SUCCESS).toEqual('GET_CONVERSATIONS_SUCCESS');
  });
});
