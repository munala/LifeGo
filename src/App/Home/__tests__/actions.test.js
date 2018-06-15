import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import bucketlistActions from '../actions';
import * as types from '../constants';

jest.mock('../../Common/api/bucketlistApi', (() => ({
  getAllBucketlists: () => Promise.resolve({
    bucketlists: [{
      name: 'oliver',
      description: '',
      createdAt: 'eevevee',
      updatedAt: 'dfefefe',
      items: [],
    }],
    nextUrl: '',
    previousUrl: '',
  }),
})));

describe('Bucketlist action creators', () => {
  it('should create a LOAD_ALL_BUCKETLISTS_SUCCESS action', () => {
    const bucketlists = [{
      name: 'mimi',
    }];

    const expectedAction = {
      type: types.LOAD_ALL_BUCKETLISTS_SUCCESS,
      data: bucketlists,
      message: '',
    };

    const action = bucketlistActions.loadAllBucketlistsSuccess(bucketlists);

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Bucketlist actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(
    'LOAD_ALL_BUCKETLISTS_SUCCESS when loading bucketlists',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.LOAD_BUCKETLIST_SUCCESS,
          body: {
            bucketlists: [{ id: 1, name: 'oliver' }],
            message: '',
          },
        },
      ];
      const store = mockStore({ data: { bucketlists: [] }, expectedActions });
      store.dispatch(bucketlistActions.loadAllBucketlists()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.LOAD_ALL_BUCKETLISTS_SUCCESS);
        done();
      });
    },
  );
});