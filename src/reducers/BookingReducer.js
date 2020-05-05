import {
  CREATE_BOOKING,
  FETCH_BOOKINGS,
  FETCH_USER_BOOKINGS,
  EDIT_BOOKING,
  DELETE_BOOKING
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_BOOKING:
      return { ...state, booking: action.payload }
    case FETCH_BOOKINGS:
      return { ...state, booking: action.payload }
    case FETCH_USER_BOOKINGS:
      return { ...state, userBookings: action.payload }
    case EDIT_BOOKING:
      return { ...state, booking: action.payload }
    case DELETE_BOOKING:
      return { ...state, booking: action.payload }
    default:
      return state;
  }
}