import notificationService from '../api';

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

describe('Notifications API tests', () => {
  it('should return success response', async () => {
    const getNotificationsResponse = await notificationService.getNotifications();
    expect(getNotificationsResponse).toEqual({ message: 'oliver' });

    const markAsReadResponse = await notificationService.markAsRead({ id: 1 });
    expect(markAsReadResponse).toEqual({ message: 'oliver' });

    const deleteNotificationResponse = await notificationService.deleteNotification({ id: 1 });
    expect(deleteNotificationResponse).toEqual({ message: 'oliver' });
  });
});

jest.clearAllMocks();
