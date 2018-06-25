import bucketlistReducer from '../reducer';
import * as actions from '../../Common/actions/bucketlistActions';

const initialState = {
  myData: {
    bucketlists: [
      { id: 1, name: 'oliver', items: [] },
      { id: 2, name: 'munala', items: [{ id: 1, name: 'oliver' }, { id: 2, name: 'derp' }] },
    ],
    nextUrl: '',
    previousUrl: '',
  },
};

const dataType = 'myData';

describe('Bucketlist reducer', () => {
  it('should add bucketlist when passed CREATE_BUCKETLIST_SUCCESS', () => {
    const newBucketlist = { name: 'ngoitsi' };
    const action = actions.createBucketlistSuccess(newBucketlist, 'explore', dataType);
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists.length).toEqual(3);
    expect(newState.bucketlists[0].name).toEqual('ngoitsi');
    expect(newState.bucketlists[1].name).toEqual('oliver');
    expect(newState.bucketlists[2].name).toEqual('munala');
  });

  it('should load bucketlists when passed LOAD_BUCKETLISTS_SUCCESS', () => {
    const newBucketlists = { bucketlists: [{ id: 3, name: 'ngoitsi' }], nextUrl: '', previousUrl: '' };
    const action = actions.loadBucketlistsSuccess({ bucketlists: newBucketlists, dataType });
    const newState = bucketlistReducer(initialState, action)[dataType];

    expect(newState.bucketlists.length).toEqual(1);
    expect(newState.bucketlists[0].name).toEqual('ngoitsi');
  });

  it('should update bucketlist when passed UPDATE_BUCKETLIST_SUCCESS', () => {
    const updatedBucketlist = { id: 1, name: 'olivers' };
    const action = actions.updateBucketlistSuccess(updatedBucketlist, 'explore', dataType);
    const newState = bucketlistReducer(initialState, action)[dataType];

    expect(newState.bucketlists[0].name).toEqual('olivers');
  });

  it('should delete bucketlist when passed DELETE_BUCKETLIST_SUCCESS', () => {
    const deletedBucketlist = { id: 1, name: 'oliver' };
    const action = actions.deleteBucketlistSuccess({ bucketlist: deletedBucketlist, screen: 'explore', dataType });
    const newState = bucketlistReducer(initialState, action);

    expect(newState.bucketlists.length).toEqual(1);
    expect(newState.bucketlists[0].name).toEqual('munala');
  });

  it('should add item when passed LOAD_BUCKETLISTS_SUCCESS', () => {
    const newItem = { id: 3, name: 'ngoitsi' };
    const action = actions.createItemSuccess(initialState.bucketlists[0], newItem, dataType);
    const newState = bucketlistReducer(initialState, action)[dataType];

    expect(newState.bucketlists[0].items.length).toEqual(1);
    expect(newState.bucketlists[0].items[0].name).toEqual('ngoitsi');
  });

  it('should update item when passed UPDATE_ITEM_SUCCESS', () => {
    const updatedItem = { id: 1, name: 'olivers' };
    const action = actions.updateItemSuccess({
      bucketlist: initialState.bucketlists[1],
      item: updatedItem,
      dataType,
    });
    const newState = bucketlistReducer(initialState, action)[dataType];

    expect(newState.bucketlists[1].items[0].name).toEqual('olivers');
  });

  it('should delete item when passed DELETE_ITEM_SUCCESS', () => {
    const deletedItem = { id: 1, name: 'oliver' };
    const action = actions.deleteItemSuccess({
      bucketlist: initialState.bucketlists[1],
      item: deletedItem,
      dataType,
    });
    const newState = bucketlistReducer(initialState, action)[dataType];

    expect(newState.bucketlists[1].items.length).toEqual(1);
  });
});
