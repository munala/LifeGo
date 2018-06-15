import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as bucketlistActions from '../actions/bucketlistActions';
import * as types from '../constants';

jest.mock('../api/bucketlistApi', (() => ({
  saveBucketlist: () => Promise.resolve({
    error: 'oliver',
  }),
  updateBucketlist: () => Promise.resolve({
    error: 'oliver',
  }),
  deleteBucketlist: () => Promise.resolve({ error: 'oliver' }),
  addItem: () => Promise.resolve({
    error: 'oliver',
  }),
  updateItem: () => Promise.resolve({
    error: 'oliver',
  }),
  deleteItem: () => Promise.resolve({ error: 'oliver' }),
  getBucketlists: () => Promise.resolve({
    error: 'oliver',
  }),
  getAllBucketlists: () => Promise.resolve({
    error: 'oliver',
  }),
})));

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('bucketlist action errors', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(
    'Should call BEGIN_API_CALL and API_CALL_ERROR when creating a bucketlist',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.API_CALL_ERROR,
          body: {
            error: 'oliver',
            screen: 'myBucketlists',
          },
        },
      ];
      const store = mockStore({ expectedActions });
      store.dispatch(bucketlistActions.saveBucketlist(expectedActions[1].body.bucketlist))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.API_CALL_ERROR);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and API_CALL_ERROR when updating a bucketlist',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.API_CALL_ERROR,
          body: {
            error: 'oliver',
            screen: 'myBucketlists',
          },
        },
      ];
      const store = mockStore({ expectedActions });
      store.dispatch(bucketlistActions.updateBucketlist(expectedActions[1].body.bucketlist))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.API_CALL_ERROR);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and API_CALL_ERROR when adding an item',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.API_CALL_ERROR,
          body: {
            error: 'oliver',
            screen: 'myBucketlists',
          },
        },
      ];
      const store = mockStore({ expectedActions });
      store.dispatch(bucketlistActions.saveItem(
        expectedActions[1].body.bucketlist,
        expectedActions[1].body.item,
      ))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.API_CALL_ERROR);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and API_CALL_ERROR when updating an item',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.API_CALL_ERROR,
          body: {
            error: 'oliver',
            screen: 'myBucketlists',
          },
        },
      ];
      const store = mockStore({ expectedActions });
      store.dispatch(bucketlistActions.updateItem(
        expectedActions[1].body.bucketlist,
        expectedActions[1].body.item,
      ))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.API_CALL_ERROR);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and API_CALL_ERROR when deleting an item',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.API_CALL_ERROR,
          body: {
            error: 'oliver',
            screen: 'myBucketlists',
          },
        },
      ];
      const store = mockStore({ expectedActions });
      store.dispatch(bucketlistActions.deleteItem(
        expectedActions[1].body.bucketlist,
        expectedActions[1].body.item,
      ))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.API_CALL_ERROR);
          done();
        });
    },
  );
});
