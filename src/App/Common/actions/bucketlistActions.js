import * as types from '../constants';
import BucketlistService from '../api/bucketlistApi';
import * as apiCallActions from './apiCallActions';

const dataTypes = ['myData', 'allData', 'exploreData'];

export const getBucketlistSuccess = ({ bucketlist, screen, dataType }) => ({
  type: types.GET_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
  dataType,
});

export const createBucketlistSuccess = ({ bucketlist, screen, dataType }) => ({
  type: types.CREATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
  dataType,
});

export const loadBucketlistsSuccess = ({ data, dataType, screen }) => ({
  type: types.LOAD_BUCKETLISTS_SUCCESS,
  data,
  dataType,
  message: '',
  screen,
});

export const updateBucketlistSuccess = ({ bucketlist, screen, dataType }) => ({
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

export const createItemSuccess = ({ bucketlist, item, dataType }) => ({
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

export const resetMessage = dispatch =>
  dispatch({
    type: types.RESET_MESSAGE,
  });

export const resetError = dispatch =>
  dispatch({
    type: types.RESET_ERROR,
  });

export const addNewBucketlist = ({ bucketlist, dataType }) => ({
  type: types.ADD_NEW_BUCKETLIST,
  bucketlist,
  dataType,
});

export const loadMore = () => dispatch => dispatch({
  type: types.LOAD_OTHER_MORE_BUCKETLISTS,
  dataType: 'allData',
});

const load = async ({
  id,
  offset,
  limit,
  search,
  dispatch,
  screen,
  dataType,
  serviceCall,
  action,
}) => {
  dispatch(apiCallActions.beginApiCall({ screen }));

  const response = await serviceCall(
    offset,
    limit,
    search,
    id,
  );

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen,
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  }

  const actionCreator = action || loadBucketlistsSuccess;

  dispatch(actionCreator({
    data: response,
    dataType,
    screen,
  }));

  dispatch(apiCallActions.resetMessage());

  return response;
};

export const loadMoreBucketlists = (
  dataType,
  offset = 0,
  limit = 50,
  search = '',
) => async (dispatch) => {
  const serviceCall =
    dataType === 'allData'
      ? BucketlistService.getAllBucketlists
      : BucketlistService.getBucketlists;

  const action = loadMore;

  return load({
    offset,
    limit,
    search,
    dispatch,
    dataType,
    serviceCall,
    action,
    screen: 'loader',
  });
};

export const explore = (
  offset = 0,
  limit = 50,
  search = '',
) => async dispatch => load({
  offset,
  limit,
  search,
  dispatch,
  serviceCall: BucketlistService.explore,
  screen: 'explore',
  dataType: 'exploreData',
});

export const loadBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async dispatch => load({
  offset,
  limit,
  search,
  dispatch,
  serviceCall: BucketlistService.getBucketlists,
  screen: 'myBucketlists',
  dataType: 'myData',
});

export const loadAllBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async dispatch => load({
  offset,
  limit,
  search,
  dispatch,
  serviceCall: BucketlistService.getAllBucketlists,
  screen: 'allBucketlists',
  dataType: 'allData',
});

export const loadOtherBucketlists = (
  id,
  offset = 0,
  limit = 50,
  search = '',
) => async dispatch => load({
  id,
  offset,
  limit,
  search,
  dispatch,
  serviceCall: BucketlistService.getOtherBucketlists,
  screen: 'myBucketlists',
  dataType: 'myData',
});


export const getBucketlist = id => async (dispatch) => {
  const response = await BucketlistService.getBucketlist(id);

  dispatch(apiCallActions.beginApiCall({ screen: 'single' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'single' }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getBucketlistSuccess({
      bucketlist: response,
      screen: 'single',
      dataType: 'allData',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const saveBucketlist = bucketlist => async (dispatch) => {
  const response = await BucketlistService.saveBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'myBucketlists' }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.slice(0, 2).forEach((dataType) => {
      dispatch(createBucketlistSuccess({
        bucketlist: response,
        screen: 'myBucketlists',
        dataType,
      }));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateBucketlist = bucketlist => async (dispatch) => {
  const response = await BucketlistService.updateBucketlist(bucketlist);
  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ error: response.error, screen: 'myBucketlists' }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(updateBucketlistSuccess({
        bucketlist: response,
        screen: 'myBucketlists',
        dataType,
      }));
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
      dispatch(createItemSuccess({
        bucketlist,
        item: response,
        dataType,
      }));
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
        bucketlist, item: { item, ...response }, dataType,
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
