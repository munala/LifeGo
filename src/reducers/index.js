import { combineReducers } from 'redux';
import data from '../App/MyLists/reducer';
import allData from '../App/Home/reducer';
import loggedIn from '../App/Auth/reducer';
import currentApiCalls from '../App/Common/reducers/apiCallReducer';
import error from '../App/Common/reducers/errorReducer';
import message from '../App/Common/reducers/messageReducer';
import profile from '../App/Profile/reducer';
import otherProfile from '../App/Profile/otherProfileReducer';
import conversations from '../App/Chat/reducer';
import notifications from '../App/Notifications/reducer';
import alerts from '../App/UserAlerts/reducer';

const rootReducer = combineReducers({
  data,
  allData,
  currentApiCalls,
  loggedIn,
  error,
  message,
  profile,
  otherProfile,
  conversations,
  notifications,
  alerts
});

export default rootReducer;
