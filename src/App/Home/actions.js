import * as types from './constants';
import * as apiCallActions from './../Common/actions/apiCallActions';
import * as bucketlistActions from './../Common/actions/bucketlistActions';
import BucketlistService from './../Common/api/bucketlistApi';

const loadAllBucketlistsSuccess = data => ({
  type: types.LOAD_ALL_BUCKETLISTS_SUCCESS,
  data,
  message: ''
});

const addNewBucketlist = bucketlist => ({
  type: types.ADD_NEW_BUCKETLIST,
  bucketlist
});

const loadMore = () => dispatch =>
  dispatch({
    type: types.LOAD_MORE_BUCKETLISTS
  });

export const loadAllBucketlists = (
  offset = 0,
  limit = 10,
  search = ''
) => async dispatch => {
  dispatch(apiCallActions.beginApiCall({ screen: 'allBucketlists' }));

  const response = await BucketlistService.getAllBucketlists(
    offset,
    limit,
    search
  );

  if (response.error) {
    dispatch(
      apiCallActions.apiCallError({
        screen: 'allBucketlists',
        error: response.error
      })
    );

    dispatch(apiCallActions.resetError());

    return;
  }

  dispatch(
    loadAllBucketlistsSuccess({
      data: response,
      screen: 'allBucketlists'
    })
  );

  dispatch(apiCallActions.resetMessage());
};

export default {
  ...bucketlistActions,
  loadAllBucketlistsSuccess,
  addNewBucketlist,
  loadMore,
  loadAllBucketlists
};
