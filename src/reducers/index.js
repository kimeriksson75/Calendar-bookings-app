import { combineReducers } from 'redux';
import calendar from './CalendarReducer';
import auth from './AuthReducer';
import bookingData from './BookingReducer';
import userMessage from './MessageReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  calendar,
  auth,
  bookingData,
  userMessage,
  form: formReducer
});
