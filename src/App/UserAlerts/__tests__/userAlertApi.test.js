import alertService from '../api';

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

describe('UserAlerts API tests', () => {
  it('should return success response', async () => {
    const getAlertsResponse = await alertService.getAlerts();
    expect(getAlertsResponse).toEqual({ message: 'oliver' });

    const markAsReadResponse = await alertService.markAsRead({ id: 1 });
    expect(markAsReadResponse).toEqual({ message: 'oliver' });

    const deleteAlertResponse = await alertService.deleteAlert({ id: 1 });
    expect(deleteAlertResponse).toEqual({ message: 'oliver' });
  });
});

jest.clearAllMocks();
