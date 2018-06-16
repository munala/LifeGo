import authService from '../api';

const user = {
  displayName: 'dd',
  username: 'dd',
  password: 'dd',
  email: 'dd',
  confirm: 'dd',
};

jest.mock('axios', () => {
  const authUrl = `${process.env.REACT_APP_API_HOST}/api/user/`;
  return ({
    create: () => ({
      defaults: { headers: { common: { 'Content-Type': '', 'Access-Control-Allow-Origin': '' } } },
      post: (url, data) => {
        if (
          (url === `${authUrl}login` || url === `${authUrl}social_login` || url === `${authUrl}reset_password`)
          && Object.keys(data).length > 1
        ) {
          return new Promise((resolve) => {
            resolve({ data: { token: 'oliver' } });
          });
        }
        if (url === `${authUrl}register` && Object.keys(data).length > 1) {
          return new Promise((resolve) => {
            resolve({ data: { message: 'oliver' } });
          });
        }
        if (Object.keys(data).length === 0) {
          return new Promise((resolve, reject) => {
            reject(new Error('derp'));
          });
        }
        if (url === `${authUrl}login` && Object.keys(data).length === 1) {
          return new Promise((resolve, reject) => {
            reject({ response: { data: { error: 'Unauthorised' } } }); // eslint-disable-line prefer-promise-reject-errors
          });
        }
        return new Promise((resolve, reject) => {
          reject(new Error('munala'));
        });
      },
    }),
  });
});

describe('Auth API tests', () => {
  it('should return success response', async () => {
    const loginResponse = await authService.loginUser(user);
    expect(loginResponse).toEqual({ token: 'oliver' });

    const socialLoginResponse = await authService.socialLogin(user);
    expect(socialLoginResponse).toEqual({ token: 'oliver' });

    const registerResponse = await authService.registerUser(user);
    expect(registerResponse).toEqual({ message: 'oliver' });
  });

  it('should return error response', async () => {
    let loginResponse = await authService.loginUser({});
    expect(loginResponse.error).toEqual('derp');

    loginResponse = await authService.loginUser({ email: 'ddd' });
    expect(loginResponse.error).toEqual({ response: { data: { error: 'Unauthorised' } } });

    const registerResponse = await authService.registerUser({});
    expect(registerResponse.error).toEqual('derp');
  });
});

jest.clearAllMocks();
