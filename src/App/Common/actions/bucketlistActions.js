import * as types from '../constants';
import BucketlistService from '../api/bucketlistApi';
import * as apiCallActions from './apiCallActions';

const dataTypes = ['myData', 'allData', 'exploreData'];

export const createBucketlistSuccess = (bucketlist, screen, dataType) => ({
  type: types.CREATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
  dataType,
});

export const loadBucketlistsSuccess = ({ data, dataType }) => ({
  type: types.LOAD_BUCKETLISTS_SUCCESS,
  data,
  dataType,
  message: '',
  screen: 'explore',
});

export const updateBucketlistSuccess = (bucketlist, screen, dataType) => ({
  type: types.UPDATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
  dataType,
});

export const deleteBucketlistSuccess = ({ bucketlist, screen, dataType }) => ({
  type: types.DELETE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
  dataType,
});

export const createItemSuccess = (bucketlist, item, dataType) => ({
  type: types.CREATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists',
  dataType,
});

export const updateItemSuccess = ({ bucketlist, item, dataType }) => ({
  type: types.UPDATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists',
  dataType,
});

export const deleteItemSuccess = ({ bucketlist, item, dataType }) => ({
  type: types.DELETE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists',
  dataType,
});

export const searchSuccess = ({ data: { bucketlists }, dataType }) => ({
  type: types.SEARCH_BUCKETLISTS,
  bucketlists,
  dataType,
});

export const resetMessage = dispatch =>
  dispatch({
    type: types.RESET_MESSAGE,
  });

export const resetError = dispatch =>
  dispatch({
    type: types.RESET_ERROR,
  });

export const addNewBucketlist = bucketlist => ({
  type: types.ADD_NEW_BUCKETLIST,
  bucketlist,
});

export const loadMore = data => ({
  type: types.LOAD_MORE_BUCKETLISTS,
  data,
  message: '',
  screen: 'loader',
});

export const loadMoreAll = data => ({
  type: types.LOAD_MORE_ALL_BUCKETLISTS,
  data,
  message: '',
  screen: 'loader',
});

export const loadMoreBucketlists = (
  type,
  offset = 0,
  limit = 10,
  search = '',
) => async (dispatch) => {
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

  dispatch(apiCallActions.apiCallError({
    screen: 'loader',
    error: '',
  }));
};

export const explore = (
  offset = 0,
  limit = 50,
  search = '',
) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'explore' }));

  const response = await BucketlistService.explore(
    offset,
    limit,
    search,
  );

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'explore',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());

    return;
  }

  dispatch(loadBucketlistsSuccess({
    data: response,
    dataType: 'exploreData',
  }));

  dispatch(apiCallActions.resetMessage());
};

export const loadBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  const response = await BucketlistService.getBucketlists(
    offset,
    limit,
    search,
  );

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'myBucketlists',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());

    return;
  }

  dispatch(loadBucketlistsSuccess({
    data: response,
    dataType: 'myData',
  }));

  dispatch(apiCallActions.resetMessage());
};

export const loadAllBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'allBucketlists' }));

  const response = await BucketlistService.getAllBucketlists(
    offset,
    limit,
    search,
  );

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'allBucketlists',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());

    return;
  }

  dispatch(loadBucketlistsSuccess({
    data: response,
    dataType: 'allData',
  }));

  dispatch(apiCallActions.resetMessage());
};

export const clearSearch = () => async (dispatch) => {
  dataTypes.forEach((dataType) => {
    dispatch({ type: types.CLEAR_SEARCH_RESULTS, dataType });
  });
};

export const searchBucketlists = (
  offset = 0,
  limit = 100,
  search = '',
) => async (dispatch) => {
  if (search) {
    const response = await BucketlistService.getAllBucketlists(
      offset,
      limit,
      search,
    );

    dataTypes.forEach((dataType) => {
      dispatch(searchSuccess({ data: response, dataType }));
    });

    return;
  }

  clearSearch()(dispatch);
};

export const saveBucketlist = bucketlist => async (dispatch) => {
  const response = await BucketlistService.saveBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'myBucketlists' }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.slice(0, 2).forEach((dataType) => {
      dispatch(createBucketlistSuccess(response, 'myBucketlists', dataType));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateBucketlist = bucketlist => async (dispatch) => {
  const response = await BucketlistService.updateBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'myBucketlists' }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(updateBucketlistSuccess(response, 'myBucketlists', dataType));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteBucketlist = bucketlist => async (dispatch) => {
  const response = await BucketlistService.deleteBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError(...response, 'myBucketlists'));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(deleteBucketlistSuccess({
        bucketlist, ...response, screen: 'myBucketlists', dataType,
      }));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const saveItem = (bucketlist, item) => async (dispatch) => {
  const response = await BucketlistService.addItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(createItemSuccess(bucketlist, response, dataType));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateItem = (bucketlist, item) => async (dispatch) => {
  const response = await BucketlistService.updateItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(updateItemSuccess({
        bucketlist, item, ...response, dataType,
      }));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteItem = (bucketlist, item) => async (dispatch) => {
  const response = await BucketlistService.deleteItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(deleteItemSuccess({
        bucketlist, item, ...response, dataType,
      }));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
