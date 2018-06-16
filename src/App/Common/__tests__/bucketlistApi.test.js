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

jest.mock('axios', () => {
  const bucketlistUrl = `${process.env.REACT_APP_API_HOST}/api/bucketlists/`;
  return ({
    create: () => ({
      defaults: { headers: { common: { 'Content-Type': '', 'Access-Control-Allow-Origin': '' } } },
      post: (url, data) => {
        if (url === bucketlistUrl && data.name === 'oliver') {
          return new Promise((resolve) => {
            resolve({ data: 'awesome' });
          });
        }
        if (url === bucketlistUrl && data.name === 'munala') {
          return new Promise((resolve) => {
            resolve({ data: { error: 'munala already exists', status: 409 } });
          });
        }
        if (url === `${bucketlistUrl}1/items/` && data.name === 'oliver') {
          return new Promise((resolve) => {
            resolve({ data: 'awesome' });
          });
        }
        if (url === `${bucketlistUrl}1/items/` && data.name === 'munala') {
          return new Promise((resolve) => {
            resolve({ data: { error: 'munala already exists', status: 409 } });
          });
        }
        return new Promise((resolve, reject) => {
          reject(new Error('munala'));
        });
      },
      get: (url) => {
        if (
          url === `${bucketlistUrl}all?offset=${0}&limit=${20}&q=${'oliver'}` ||
          url === `${bucketlistUrl}?offset=${0}&limit=${20}&q=${'oliver'}`
        ) {
          return new Promise((resolve) => {
            resolve({ data: 'awesome' });
          });
        }
        return new Promise((resolve, reject) => {
          reject(new Error('munala'));
        });
      },
      put: (url, data) => {
        if (url === `${bucketlistUrl}1` && data.name === 'oliver') {
          return new Promise((resolve) => {
            resolve({ data: 'awesome' });
          });
        }
        if (url === `${bucketlistUrl}1` && data.name === 'munala') {
          return new Promise((resolve, reject) => {
            reject(new Error('munala'));
          });
        }
        if (url === `${bucketlistUrl}2`) {
          return new Promise((resolve) => {
            resolve({ data: { message: 'oliver is already in use', response: { status: 409 } } });
          });
        }
        if (url === `${bucketlistUrl}1/items/1` && data.name === 'oliver') {
          return new Promise((resolve) => {
            resolve({ data: 'awesome' });
          });
        }
        if (url === `${bucketlistUrl}1/items/1` && data.name === 'munala') {
          return new Promise((resolve) => {
            resolve({ data: { message: 'munala is already in use', status: 409 } });
          });
        }
        return new Promise((resolve, reject) => {
          reject(new Error('munala'));
        });
      },
      delete: (url) => {
        if (url === `${bucketlistUrl}1`) {
          return new Promise((resolve) => {
            resolve({ data: 'awesome' });
          });
        }
        if (url === `${bucketlistUrl}3`) {
          return new Promise((resolve, reject) => {
            reject(new Error('munala'));
          });
        }
        if (url === `${bucketlistUrl}1/items/3`) {
          return new Promise((resolve, reject) => {
            reject(new Error('munala'));
          });
        }
        if (url === `${bucketlistUrl}1/items/1`) {
          return new Promise((resolve) => {
            resolve({ data: 'awesome' });
          });
        }
        return new Promise((resolve) => {
          resolve({ data: { message: 'Unauthorised', response: { status: 401 } } });
        });
      },
    }),
  });
});

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

    response = await bucketlistService.saveBucketlist({ ...bucketlist, name: 'munala' });
    expect(response.error).toEqual('munala already exists');

    response = await bucketlistService.saveBucketlist({ ...bucketlist, name: 'munalsa' });
    expect(response.error).toEqual('munala');

    response = await bucketlistService.updateBucketlist({ ...bucketlist, id: 2 });
    expect(response.error).toEqual('oliver is already in use');

    response = await bucketlistService.updateBucketlist({ ...bucketlist, name: 'munala' });
    expect(response.error).toEqual('munala');

    response = await bucketlistService.deleteBucketlist({ ...bucketlist, id: 2 });
    expect(response.message).toEqual('Unauthorised');

    response = await bucketlistService.deleteBucketlist({ ...bucketlist, id: 3 });
    expect(response.error).toEqual('munala');

    response = await bucketlistService.addItem(bucketlist, { ...item, name: 'munala' });
    expect(response.error).toEqual('munala already exists');

    response = await bucketlistService.addItem(bucketlist, { ...item, name: 'wdww' });
    expect(response.error).toEqual('munala');

    response = await bucketlistService.updateItem(bucketlist, { ...item, id: 2 });
    expect(response.error).toEqual('munala');

    response = await bucketlistService.updateItem(bucketlist, { ...item, name: 'munala' });
    expect(response.error).toEqual('munala is already in use');

    response = await bucketlistService.deleteItem(bucketlist, { ...item, id: 2 });
    expect(response.message).toEqual('Unauthorised');

    response = await bucketlistService.deleteItem(bucketlist, { ...item, id: 3 });
    expect(response.error).toEqual('munala');

    response = handleError({ response: { data: { message: 'derp' }, status: 401 } });
    expect(response.code).toEqual(401);
    response = handleError({ response: { data: { message: 'derp' }, status: 409 } });
    expect(response.code).toEqual(409);
  });
});

jest.clearAllMocks();
