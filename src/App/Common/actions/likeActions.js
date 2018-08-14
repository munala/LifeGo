import * as types from '../constants';
import likeService from '../api/likeApi';
import * as apiCallActions from './apiCallActions';
import { resetError } from './bucketlistActions';

const dataTypes = ['myData', 'allData', 'exploreData'];

export const likeSuccess = (bucketlist, like, dataType) => ({
  type: types.LIKE,
  like,
  bucketlist,
  message: '',
  dataType,
});

export const unlikeSuccess = (like, dataType) => ({
  type: types.UNLIKE,
  message: '',
  like,
  dataType,
});

export const like = bucketlist => async (dispatch) => {
  const response = await likeService.like(bucketlist);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    resetError(dispatch);
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(likeSuccess(bucketlist, response.data.like, dataType));
    });
  }
};

export const unlike = (bucketlist, likes) => async (dispatch) => {
  const response = await likeService.unlike(bucketlist, likes);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    resetError(dispatch);
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(unlikeSuccess(likes, dataType));
    });
  }
};
