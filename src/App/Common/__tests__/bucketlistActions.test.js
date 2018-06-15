import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as bucketlistActions from '../actions/bucketlistActions';
import * as types from '../constants';

jest.mock('../api/bucketlistApi', (() => ({
  saveBucketlist: bucketlist => Promise.resolve({
    ...bucketlist,
    id: '1111e2e',
    description: '',
    createdAt: 'eevevee',
    updatedAt: 'dfefefe',
  }),
  updateBucketlist: bucketlist => Promise.resolve({
    ...bucketlist,
    id: '1111e2e',
    description: '',
    createdAt: 'eevevee',
    updatedAt: 'dfefefe',
  }),
  deleteBucketlist: bucketlist => Promise.resolve(bucketlist),
  addItem: (bucketlist, item) => Promise.resolve({
    ...item,
    id: '1111e2e',
    done: false,
    createdAt: 'eevevee',
    updatedAt: 'dfefefe',
  }),
  updateItem: (bucketlist, item) => Promise.resolve({
    ...item,
    id: '1111e2e',
    done: true,
    createdAt: 'eevevee',
    updatedAt: 'dfefefe',
  }),
  deleteItem: (bucketlist, item) => Promise.resolve({ bucketlist, item }),
  getBucketlists: () => Promise.resolve({
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

describe('Bucketlist actions', () => {
  it('should create a RESET_ERROR action', (done) => {
    const expectedAction = {
      type: types.RESET_ERROR,
    };
    const dispatch = actions => actions;

    const action = bucketlistActions.resetError(dispatch);

    expect(action).toEqual(expectedAction);
    done();
  });

  it('should create a RESET_MESSAGE action', (done) => {
    const expectedAction = {
      type: types.RESET_MESSAGE,
    };
    const dispatch = actions => actions;

    const action = bucketlistActions.resetMessage(dispatch);

    expect(action).toEqual(expectedAction);
    done();
  });


  it('should create a CREATE_BUCKETLIST_SUCCESS action', () => {
    const bucketlist = {
      name: 'mimi',
    };

    const expectedAction = {
      type: types.CREATE_BUCKETLIST_SUCCESS,
      bucketlist,
      message: '',
    };

    const action = bucketlistActions.createBucketlistSuccess(bucketlist);

    expect(action).toEqual(expectedAction);
  });

  it('should create a UPDATE_BUCKETLIST_SUCCESS action', () => {
    const bucketlist = {
      name: 'mimi',
    };

    const expectedAction = {
      type: types.UPDATE_BUCKETLIST_SUCCESS,
      bucketlist,
      message: '',
    };

    const action = bucketlistActions.updateBucketlistSuccess(bucketlist);

    expect(action).toEqual(expectedAction);
  });

  it('should create a DELETE_BUCKETLIST_SUCCESS action', () => {
    const bucketlist = {
      name: 'mimi',
    };

    const expectedAction = {
      type: types.DELETE_BUCKETLIST_SUCCESS,
      bucketlist,
      message: '',
      screen: 'myBucketlists',
    };

    const action = bucketlistActions.deleteBucketlistSuccess(({ bucketlist, screen: 'myBucketlists' }));

    expect(action).toEqual(expectedAction);
  });

  it('should create a CREATE_ITEM_SUCCESS action', () => {
    const bucketlist = {
      name: 'mimi',
    };
    const item = {
      name: 'mimi',
    };

    const expectedAction = {
      type: types.CREATE_ITEM_SUCCESS,
      bucketlist,
      item,
      message: '',
      screen: 'myBucketlists',
    };

    const action = bucketlistActions.createItemSuccess(bucketlist, item);

    expect(action).toEqual(expectedAction);
  });

  it('should create a UPDATE_ITEM_SUCCESS action', () => {
    const bucketlist = {
      name: 'mimi',
    };
    const item = {
      name: 'mimi',
    };

    const expectedAction = {
      type: types.UPDATE_ITEM_SUCCESS,
      bucketlist,
      item,
      message: '',
      screen: 'myBucketlists',
    };

    const action = bucketlistActions.updateItemSuccess({ bucketlist, item });

    expect(action).toEqual(expectedAction);
  });

  it('should create a DELETE_ITEM_SUCCESS action', () => {
    const bucketlist = {
      name: 'mimi',
    };
    const item = {
      name: 'mimi',
    };

    const expectedAction = {
      type: types.DELETE_ITEM_SUCCESS,
      bucketlist,
      item,
      message: '',
      screen: 'myBucketlists',
    };

    const action = bucketlistActions.deleteItemSuccess({ bucketlist, item });

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async calls', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(
    'Should call BEGIN_API_CALL and CREATE_BUCKETLIST_SUCCESS when creating a bucketlist',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.CREATE_BUCKETLIST_SUCCESS,
          body: {
            bucketlist: {
              name: 'oliver',
              id: '1111e2e',
              description: '',
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            message: 'oliver added',
          },
        },
      ];
      const store = mockStore({ data: { bucketlists: [] }, expectedActions });
      store.dispatch(bucketlistActions.saveBucketlist(expectedActions[1].body.bucketlist))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.CREATE_BUCKETLIST_SUCCESS);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and UPDATE_BUCKETLIST_SUCCESS when updating a bucketlist',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.UPDATE_BUCKETLIST_SUCCESS,
          body: {
            bucketlist: {
              name: 'oliver',
              id: '1111e2e',
              description: '',
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            message: 'oliver updated',
          },
        },
      ];
      const store = mockStore({ data: { bucketlists: [] }, expectedActions });
      store.dispatch(bucketlistActions.updateBucketlist(expectedActions[1].body.bucketlist))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.UPDATE_BUCKETLIST_SUCCESS);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and DELETE_BUCKETLIST_SUCCESS when deleting a bucketlist',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.DELETE_BUCKETLIST_SUCCESS,
          body: {
            bucketlist: {
              name: 'oliver',
              id: '1111e2e',
              description: '',
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            message: 'oliver deleted',
          },
        },
      ];
      const store = mockStore({ data: { bucketlists: [] }, expectedActions });
      store.dispatch(bucketlistActions.deleteBucketlist(expectedActions[1].body.bucketlist))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.DELETE_BUCKETLIST_SUCCESS);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and CREATE_ITEM_SUCCESS when adding an item',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.CREATE_ITEM_SUCCESS,
          body: {
            bucketlist: {
              name: 'oliver',
              id: '1111e2e',
              description: '',
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            item: {
              name: 'oliver',
              id: '1111e2e',
              done: false,
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            message: 'oliver added',
          },
        },
      ];
      const store = mockStore({ data: { bucketlists: [] }, expectedActions });
      store.dispatch(bucketlistActions.saveItem(
        expectedActions[1].body.bucketlist,
        expectedActions[1].body.item,
      ))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.CREATE_ITEM_SUCCESS);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and UPDATE_ITEM_SUCCESS when updating an item',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.UPDATE_ITEM_SUCCESS,
          body: {
            bucketlist: {
              name: 'oliver',
              id: '1111e2e',
              description: '',
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            item: {
              name: 'oliver',
              id: '1111e2e',
              done: true,
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            message: 'oliver updated',
          },
        },
      ];
      const store = mockStore({ data: { bucketlists: [] }, expectedActions });
      store.dispatch(bucketlistActions.updateItem(
        expectedActions[1].body.bucketlist,
        expectedActions[1].body.item,
      ))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.UPDATE_ITEM_SUCCESS);
          done();
        });
    },
  );

  it(
    'Should call BEGIN_API_CALL and DELETE_ITEM_SUCCESS when deleting an item',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.DELETE_ITEM_SUCCESS,
          body: {
            bucketlist: {
              name: 'oliver',
              id: '1111e2e',
              description: '',
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            item: {
              name: 'oliver',
              id: '1111e2e',
              done: true,
              createdAt: 'eevevee',
              updatedAt: 'dfefefe',
            },
            message: 'oliver deleted',
          },
        },
      ];
      const store = mockStore({ data: { bucketlists: [] }, expectedActions });
      store.dispatch(bucketlistActions.deleteItem(
        expectedActions[1].body.bucketlist,
        expectedActions[1].body.item,
      ))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
          expect(actions[1].type).toEqual(types.DELETE_ITEM_SUCCESS);
          done();
        });
    },
  );
});
