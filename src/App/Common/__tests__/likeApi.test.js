import likeService from '../api/likeApi';

jest.mock('axios', () => ({
  create: () => ({
    defaults: { headers: { common: { 'Content-Type': '', 'Access-Control-Allow-Origin': '' } } },
    post: (url, data) => new Promise((resolve) => {
      resolve({ data: { message: 'oliver' } });
    }),
  }),
}));

describe('Likes API tests', () => {
  it('should return success response', async () => {
    const likeResponse = await likeService.like({ id: 1 }, { id: 1, content: 'message' });
    expect(likeResponse).toEqual({ message: 'oliver' });

    const unlikeResponse = await likeService.unlike({ id: 1 }, { id: 1 });
    expect(unlikeResponse).toEqual({ message: 'oliver' });
  });
});

jest.clearAllMocks();
