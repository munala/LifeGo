import bucketlistReducer from '../reducer';
import actions from '../actions';

const initialState = {
  bucketlists: [
    { id: 1, name: 'oliver', items: [] },
    { id: 2, name: 'munala', items: [{ id: 1, name: 'oliver' }, { id: 2, name: 'derp' }] },
  ],
  nextUrl: '',
  previousUrl: '',
};

describe('Bucketlist reducer', () => {
  it('should add bucketlist when passed CREATE_BUCKETLIST_SUCCESS', () => {
    const newBucketlist = { name: 'ngoitsi' };
    const action = actions.createBucketlistSuccess(newBucketlist);
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists.length).toEqual(3);
    expect(newState.bucketlists[0].name).toEqual('ngoitsi');
    expect(newState.bucketlists[1].name).toEqual('oliver');
    expect(newState.bucketlists[2].name).toEqual('munala');
  });

  it('should load bucketlists when passed LOAD_BUCKETLISTS_SUCCESS', () => {
    const newBucketlists = { bucketlists: [{ id: 3, name: 'ngoitsi' }], nextUrl: '', previousUrl: '' };
    const action = actions.loadBucketlistsSuccess(newBucketlists);
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists.length).toEqual(1);
    expect(newState.bucketlists[0].name).toEqual('ngoitsi');
  });

  it('should update bucketlist when passed UPDATE_BUCKETLIST_SUCCESS', () => {
    const updatedBucketlist = { id: 1, name: 'olivers' };
    const action = actions.updateBucketlistSuccess(updatedBucketlist);
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists[0].name).toEqual('olivers');
  });

  it('should delete bucketlist when passed DELETE_BUCKETLIST_SUCCESS', () => {
    const deletedBucketlist = { id: 1, name: 'oliver' };
    const action = actions.deleteBucketlistSuccess({ bucketlist: deletedBucketlist });
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists.length).toEqual(1);
    expect(newState.bucketlists[0].name).toEqual('munala');
  });

  it('should add item when passed LOAD_BUCKETLISTS_SUCCESS', () => {
    const newItem = { id: 3, name: 'ngoitsi' };
    const action = actions.createItemSuccess(initialState.bucketlists[0], newItem);
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists[0].items.length).toEqual(1);
    expect(newState.bucketlists[0].items[0].name).toEqual('ngoitsi');
  });

  it('should update item when passed UPDATE_ITEM_SUCCESS', () => {
    const updatedItem = { id: 1, name: 'olivers' };
    const action = actions.updateItemSuccess({
      bucketlist: initialState.bucketlists[1],
      item: updatedItem,
    });
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists[1].items[0].name).toEqual('olivers');
  });

  it('should delete item when passed DELETE_ITEM_SUCCESS', () => {
    const deletedItem = { id: 1, name: 'oliver' };
    const action = actions.deleteItemSuccess({
      bucketlist: initialState.bucketlists[1],
      item: deletedItem,
    });
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists[1].items.length).toEqual(1);
  });
});
