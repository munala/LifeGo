import * as types from './constants';
import alertService from './api';
import * as apiCallActions from '../Common/actions/apiCallActions';

export const getAlertsSuccess = ({ alerts, screen }) => ({
  type: types.GET_ALERTS,
  alerts,
  message: '',
  screen,
});

export const newAlert = ({ alert }) => ({
  type: types.NEW_ALERT,
  alert,
  message: '',
});

export const markAsReadSuccess = alert => ({
  type: types.EDIT_ALERT,
  alert,
  message: '',
  screen: 'userAlerts',
});

export const deleteAlertSuccess = alert => ({
  type: types.DELETE_ALERT,
  alert,
  message: '',
  screen: 'userAlerts',
});

export const getAlerts = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'userAlerts' }));

  const response = await alertService.getAlerts();

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'userAlerts',
      error: response.error,
    }));
  } else {
    dispatch(getAlertsSuccess({
      alerts: response.data.getUserNotifications,
      screen: 'userAlerts',
    }));
  }

  return response;
};

export const markAlertAsRead = alert => async (dispatch) => {
  const response = await alertService.markAsRead(alert);

  dispatch(apiCallActions.beginApiCall({ screen: 'userAlerts' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'userAlerts',
    }));
  } else {
    dispatch(markAsReadSuccess({
      ...alert,
      ...response.data.markUserNotificationAsRead,
    }));
  }

  return response;
};

export const deleteAlert = alert => async (dispatch) => {
  const response = await alertService.deleteAlert(alert);

  dispatch(apiCallActions.beginApiCall({ screen: 'userAlerts' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'userAlerts',
    }));
  } else {
    dispatch(deleteAlertSuccess(alert));
  }

  return response;
};
