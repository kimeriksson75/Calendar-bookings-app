import { combineReducers } from 'redux';
import auth from './AuthReducer';
import calendar from './CalendarReducer';
import service from './ServiceReducer';
import bookingData from './BookingReducer';
import userMessage from './MessageReducer';
import application from './ApplicationReducer';

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  calendar,
  bookingData,
  service,
  userMessage,
  application,
  form: formReducer
});
