import profileService from '../api';

const user = {
  displayName: 'dd',
  username: 'dd',
  password: 'dd',
  email: 'dd',
  confirm: 'dd',
};

jest.mock('axios', () => ({
  create: () => ({
    defaults: { headers: { common: { 'Content-Type': '', 'Access-Control-Allow-Origin': '' } } },
    post: (url, data) => new Promise((resolve) => {
      resolve({ data: { message: 'oliver' } });
    }),
    get: (url, data) => new Promise((resolve) => {
      resolve({ data: { message: 'oliver' } });
    }),
    put: (url, data) => new Promise((resolve) => {
      resolve({ data: { message: 'oliver' } });
    }),
    delete: (url, data) => new Promise((resolve) => {
      resolve({ data: { message: 'oliver' } });
    }),
  }),
}));

describe('Profile API tests', () => {
  it('should return success response', async () => {
    const getProfileResponse = await profileService.getProfile(user);
    expect(getProfileResponse).toEqual({ message: 'oliver' });

    const getOtherProfileResponse = await profileService.getOtherProfile(user);
    expect(getOtherProfileResponse).toEqual({ message: 'oliver' });

    const updateProfileResponse = await profileService.updateProfile(user);
    expect(updateProfileResponse).toEqual({ message: 'oliver' });

    const searchUsersResponse = await profileService.searchUsers(user);
    expect(searchUsersResponse).toEqual({ message: 'oliver' });

    const addFriendResponse = await profileService.addFriend(user);
    expect(addFriendResponse).toEqual({ message: 'oliver' });

    const removeFriendResponse = await profileService.removeFriend(user);
    expect(removeFriendResponse).toEqual({ message: 'oliver' });
  });
});

jest.clearAllMocks();
