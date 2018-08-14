import chatService from '../api';

jest.mock('axios', () => ({
  create: () => ({
    defaults: { headers: { common: { 'Content-Type': '', 'Access-Control-Allow-Origin': '' } } },
    post: (url, data) => new Promise((resolve) => {
      resolve({ data: { message: 'oliver' } });
    }),
  }),
}));

describe('Chat API tests', () => {
  it('should return success response', async () => {
    const sendMessageResponse = await chatService.sendMessage({});
    expect(sendMessageResponse).toEqual({ message: 'oliver' });

    const startConversationResponse = await chatService.startConversation({});
    expect(startConversationResponse).toEqual({ message: 'oliver' });

    const updateMessageResponse = await chatService.updateMessage({ id: 1 });
    expect(updateMessageResponse).toEqual({ message: 'oliver' });

    const deleteMessageResponse = await chatService.deleteMessage({ id: 1 });
    expect(deleteMessageResponse).toEqual({ message: 'oliver' });

    const getConversationsResponse = await chatService.getConversations();
    expect(getConversationsResponse).toEqual({ message: 'oliver' });

    const deleteConversationResponse = await chatService.deleteConversation({ id: 1 });
    expect(deleteConversationResponse).toEqual({ message: 'oliver' });
  });
});

jest.clearAllMocks();
