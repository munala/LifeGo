import bucketlistService from '../api/bucketlistApi';
import { handleError } from '../../../utils/api';

const bucketlist = {
  id: 1,
  name: 'oliver',
};
const item = {
  id: 1,
  name: 'oliver',
};

let response;

jest.mock('axios', () => ({
  create: () => ({
    defaults: { headers: { common: { 'Content-Type': '', 'Access-Control-Allow-Origin': '' } } },
    post: (url, { query }) => {
      if (query.includes('offset: 0') && query.includes('limit: 20') && query.includes('name: "oliver"')) {
        return new Promise((resolve) => {
          resolve({ data: 'awesome' });
        });
      }
      if (query.includes('bucketlistId: "2"')) {
        return new Promise((resolve) => {
          resolve({ data: { message: 'oliver is already in use', response: { status: 409 } } });
        });
      }
      if (query.includes('bucketlistId: "1"') && query.includes('Item') && query.includes('oliver')) {
        return new Promise((resolve) => {
          resolve({ data: 'awesome' });
        });
      }
      if (query.includes('bucketlistId: "1"') && query.includes('Item') && query.includes('munala')) {
        return new Promise((resolve) => {
          resolve({ data: { error: 'munala already exists', status: 409 } });
        });
      }
      if (query.includes('oliver')) {
        return new Promise((resolve) => {
          resolve({ data: 'awesome' });
        });
      }
      if (query.includes('deleteBucketlist')) {
        return new Promise((resolve) => {
          resolve({ data: 'awesome' });
        });
      }
      if (query.includes('deleteItem')) {
        return new Promise((resolve) => {
          resolve({ data: 'awesome' });
        });
      }
      return new Promise((resolve, reject) => {
        reject(new Error('munala'));
      });
    },
  }),
}));

describe('Bucketlist API tests', () => {
  it('should return success response', async () => {
    response = await bucketlistService.getBucketlists(0, 20, 'oliver');
    expect(response).toEqual('awesome');

    response = await bucketlistService.getAllBucketlists(0, 20, 'oliver');
    expect(response).toEqual('awesome');

    response = await bucketlistService.saveBucketlist(bucketlist);
    expect(response).toEqual('awesome');

    response = await bucketlistService.updateBucketlist(bucketlist);
    expect(response).toEqual('awesome');

    response = await bucketlistService.deleteBucketlist(bucketlist);
    expect(response).toEqual('awesome');

    response = await bucketlistService.addItem(bucketlist, item);
    expect(response).toEqual('awesome');

    response = await bucketlistService.updateItem(bucketlist, item);
    expect(response).toEqual('awesome');

    response = await bucketlistService.deleteItem(bucketlist, item);
    expect(response).toEqual('awesome');
  });

  it('should return error response', async () => {
    response = await bucketlistService.getAllBucketlists(2, 20, '');
    expect(response.error).toEqual('munala');

    response = handleError({ response: { data: { message: 'derp' }, status: 401 } });
    expect(response.code).toEqual(401);

    response = handleError({ response: { data: { message: 'derp' }, status: 409 } });
    expect(response.code).toEqual(409);
  });
});

jest.clearAllMocks();
