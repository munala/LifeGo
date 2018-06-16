import settingsService from '../api';

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

describe('Settings API tests', () => {
  it('should return success response', async () => {
    const changePasswordResponse = await settingsService.changePassword(user);
    expect(changePasswordResponse).toEqual({ message: 'oliver' });

    const changeEmailResponse = await settingsService.changeEmail(user);
    expect(changeEmailResponse).toEqual({ message: 'oliver' });

    const changeUsernameResponse = await settingsService.changeUsername(user);
    expect(changeUsernameResponse).toEqual({ message: 'oliver' });

    const deleteAccountResponse = await settingsService.deleteAccount(user);
    expect(deleteAccountResponse).toEqual({ message: 'oliver' });
  });
});

jest.clearAllMocks();
