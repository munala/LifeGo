import chatReducer from '../reducer';
import * as actions from '../actions';

const initialState = [];

describe('Chat reducer', () => {
  it('should sendMessage', () => {
    const action = actions.sendMessageSuccess({ content: 'none', conversationId: 1 });
    const newState = chatReducer([{ id: 1, messages: [] }], action);

    expect(newState).toEqual([{ id: 1, messages: [{ content: 'none', conversationId: 1 }] }]);
  });

  it('should startConversation', () => {
    const action = actions.startConversationSuccess({
      id: 1,
    });
    const newState = chatReducer(initialState, action);
    expect(newState).toEqual([{
      id: 1,
    }]);
  });

  it('should editMessage', () => {
    const action = actions.editMessageSuccess({
      content: 'none',
      id: 1,
    });
    const newState = chatReducer([{ messages: [{ id: 1, content: 'some' }] }], action);
    expect(newState).toEqual([{ messages: [{ id: 1, content: 'none' }] }]);
  });

  it('should deleteMessage', () => {
    const action = actions.deleteMessageSuccess({
      content: 'none',
      id: 1,
    });
    const newState = chatReducer([{ messages: [{ id: 1, content: 'some' }] }], action);
    expect(newState).toEqual([{ messages: [] }]);
  });

  it('should deleteConversation', () => {
    const action = actions.deleteConversationSuccess({
      conversation: {
        id: 1,
      },
    });
    const newState = chatReducer([{ id: 1 }], action);
    expect(newState).toEqual(initialState);
  });

  it('should getConversations', () => {
    const action = actions.getConversationsSuccess({
      conversations: [{
        id: 1,
      }],
    });
    const newState = chatReducer(initialState, action);
    expect(newState).toEqual([{
      id: 1,
    }]);
  });
});
