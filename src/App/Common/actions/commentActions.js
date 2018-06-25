import * as types from '../constants';
import commentService from '../api/commentApi';
import * as apiCallActions from './apiCallActions';

const dataTypes = ['myData', 'allData', 'exploreData'];

export const addCommentSuccess = (bucketlist, comment, dataType) => ({
  type: types.ADD_COMMENT,
  comment,
  bucketlist,
  message: '',
  screen: 'others',
  dataType,
});

export const editCommentSuccess = (bucketlist, comment, dataType) => ({
  type: types.EDIT_COMMENT,
  comment,
  bucketlist,
  message: '',
  screen: 'others',
  dataType,
});

export const deleteCommentSuccess = (bucketlist, comment, dataType) => ({
  type: types.DELETE_COMMENT,
  bucketlist,
  comment,
  message: '',
  screen: 'others',
  dataType,
});

export const addComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.addComment(bucketlist, comment);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(addCommentSuccess(bucketlist, response, dataType));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.updateComment(comment);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.resetError());

    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(editCommentSuccess(bucketlist, response, dataType));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.deleteComment(comment);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.resetError());

    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));
  } else {
    dataTypes.forEach((dataType) => {
      dispatch(deleteCommentSuccess(bucketlist, comment, dataType));
    });

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
