import * as types from './constants';
import * as apiCallActions from './../Common/actions/apiCallActions';
import * as bucketlistActions from './../Common/actions/bucketlistActions';
import BucketlistService from './../Common/api/bucketlistApi';

const loadBucketlistsSuccess = data => ({
  type: types.LOAD_BUCKETLISTS_SUCCESS,
  data,
  message: '',
});

const loadBucketlists = (
  offset = 0,
  limit = 10,
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
    screen: 'myBucketlists',
  }));

  dispatch(apiCallActions.resetMessage());
};

export default {
  ...bucketlistActions,
  loadBucketlistsSuccess,
  loadBucketlists,
};
