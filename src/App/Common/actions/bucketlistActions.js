import * as types from '../constants';
import BucketlistService from '../api/bucketlistApi';
import * as apiCallActions from './apiCallActions';

export const createBucketlistSuccess = (bucketlist, screen) => ({
  type: types.CREATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen
});

export const updateBucketlistSuccess = (bucketlist, screen) => ({
  type: types.UPDATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen
});

export const deleteBucketlistSuccess = ({ bucketlist, screen }) => ({
  type: types.DELETE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen
});

export const createItemSuccess = (bucketlist, item) => ({
  type: types.CREATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists'
});

export const updateItemSuccess = ({ bucketlist, item }) => ({
  type: types.UPDATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists'
});

export const deleteItemSuccess = ({ bucketlist, item }) => ({
  type: types.DELETE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists'
});

export const searchSuccess = ({ data: { bucketlists } }) => ({
  type: types.SEARCH_BUCKETLISTS,
  bucketlists
});

export const resetMessage = dispatch =>
  dispatch({
    type: types.RESET_MESSAGE
  });

export const resetError = dispatch =>
  dispatch({
    type: types.RESET_ERROR
  });

export const addNewBucketlist = bucketlist => ({
  type: types.ADD_NEW_BUCKETLIST,
  bucketlist
});

export const loadMore = data => ({
  type: types.LOAD_MORE_BUCKETLISTS,
  data,
  message: '',
  screen: 'loader'
});

export const loadMoreAll = data => ({
  type: types.LOAD_MORE_ALL_BUCKETLISTS,
  data,
  message: '',
  screen: 'loader'
});

export const loadMoreBucketlists = (
  type,
  offset = 0,
  limit = 10,
  search = ''
) => async dispatch => {
  const action =
    type === 'allBucketlists'
      ? BucketlistService.getAllBucketlists
      : BucketlistService.getBucketlists;
  const actionCreator = type === 'allBucketlists' ? loadMoreAll : loadMore;

  dispatch(apiCallActions.beginApiCall({ screen: 'loader' }));

  const response = await action(offset, limit, search);

  if (!response.error) {
    dispatch(actionCreator(response));

    return;
  }

  dispatch(
    apiCallActions.apiCallError({
      screen: 'loader',
      error: ''
    })
  );
};

export const clearSearch = () => async dispatch => {
  dispatch({ type: types.CLEAR_SEARCH_RESULTS });
};

export const searchBucketlists = (
  offset = 0,
  limit = 100,
  search = ''
) => async dispatch => {
  if (search) {
    const response = await BucketlistService.getAllBucketlists(
      offset,
      limit,
      search
    );

    dispatch(searchSuccess({ data: response }));

    return;
  }

  clearSearch()(dispatch);
};

export const saveBucketlist = (bucketlist, screen) => async dispatch => {
  const response = await BucketlistService.saveBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createBucketlistSuccess(response, screen));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateBucketlist = (bucketlist, screen) => async dispatch => {
  const response = await BucketlistService.updateBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateBucketlistSuccess(response, screen));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteBucketlist = (bucketlist, screen) => async dispatch => {
  const response = await BucketlistService.deleteBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError(...response, screen));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteBucketlistSuccess({ bucketlist, ...response, screen }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const saveItem = (bucketlist, item) => async dispatch => {
  const response = await BucketlistService.addItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        ...response,
        screen: 'myBucketlists'
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createItemSuccess(bucketlist, response));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateItem = (bucketlist, item) => async dispatch => {
  const response = await BucketlistService.updateItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        ...response,
        screen: 'myBucketlists'
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateItemSuccess({ bucketlist, item, ...response }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteItem = (bucketlist, item) => async dispatch => {
  const response = await BucketlistService.deleteItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        ...response,
        screen: 'myBucketlists'
      })
    );

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteItemSuccess({ bucketlist, item, ...response }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
