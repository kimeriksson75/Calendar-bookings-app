import {
  CREATE_BOOKING,
  CREATE_BOOKING_ERROR,
  CREATE_BOOKING_SUCCESS,
  FETCH_BOOKINGS,
  FETCH_USER_BOOKINGS,
  FETCH_USER_BOOKINGS_ERROR,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_CALENDAR_BOOKINGS,
  FETCH_CALENDAR_BOOKINGS_ERROR,
  FETCH_CALENDAR_BOOKINGS_SUCCESS,
  EDIT_BOOKING,
  EDIT_BOOKING_ERROR,
  EDIT_BOOKING_SUCCESS,
  FETCH_BOOKINGS_ERROR,
  FETCH_BOOKINGS_SUCCESS
} from '../constants';

const INIITAL_STATE = {
  isFetching: false
}

export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case CREATE_BOOKING:
      return { ...state, isFetching: true }
    case CREATE_BOOKING_ERROR:
      return { ...state, isFetching: false }
    case CREATE_BOOKING_SUCCESS:
      return { ...state, booking: action.payload, isFetching: false }
    case FETCH_BOOKINGS:
      return { ...state, isFetching: true }
    case FETCH_BOOKINGS_ERROR:
      return { ...state, isFetching: false }
    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, booking: action.payload, isFetching: false }
    case FETCH_CALENDAR_BOOKINGS:
      return { ...state, calendarBookings: null, isFetching: true }
    case FETCH_CALENDAR_BOOKINGS_ERROR:
      return { ...state, calendarBookings: null, isFetching: false }
    case FETCH_CALENDAR_BOOKINGS_SUCCESS:
      return { ...state, calendarBookings: action.payload, isFetching: false }
    case FETCH_USER_BOOKINGS:
      return { ...state, userBookings: null, isFetching: true }
    case FETCH_USER_BOOKINGS_ERROR:
      return { ...state, userBookings: null, isFetching: false }
    case FETCH_USER_BOOKINGS_SUCCESS:
      return { ...state, userBookings: action.payload, isFetching: false }
    case EDIT_BOOKING:
      return { ...state, isFetching: true }
    case EDIT_BOOKING_ERROR:
      return { ...state, isFetching: false }
    case EDIT_BOOKING_SUCCESS:
      return { ...state, booking: action.payload, isFetching: false }
    default:
      return state;
  }
}