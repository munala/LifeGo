import commentService from '../api/commentApi';

jest.mock('axios', () => ({
  create: () => ({
    defaults: { headers: { common: { 'Content-Type': '', 'Access-Control-Allow-Origin': '' } } },
    post: (url, data) => new Promise((resolve) => {
      resolve({ data: { message: 'oliver' } });
    }),
  }),
}));

describe('Comments API tests', () => {
  it('should return success response', async () => {
    const addCommentResponse = await commentService.addComment({ id: 1 }, { id: 1, content: 'message' });
    expect(addCommentResponse).toEqual({ message: 'oliver' });

    const updateCommentResponse = await commentService.updateComment({ id: 1 }, { id: 1, content: 'message' });
    expect(updateCommentResponse).toEqual({ message: 'oliver' });

    const deleteCommentResponse = await commentService.deleteComment({ id: 1 }, { id: 1 });
    expect(deleteCommentResponse).toEqual({ message: 'oliver' });
  });
});

jest.clearAllMocks();
