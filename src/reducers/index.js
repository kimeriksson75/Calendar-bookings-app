import { combineReducers } from 'redux';
import auth from './AuthReducer';
import calendar from './CalendarReducer';
import service from './ServiceReducer';
import residences from './ResidenceReducer'
import apartments from './ApartmentReducer'
import bookingData from './BookingReducer';
import userMessage from './MessageReducer';
import application from './ApplicationReducer';

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  calendar,
  bookingData,
  service,
  residences,
  apartments,
  userMessage,
  application,
  form: formReducer
});
