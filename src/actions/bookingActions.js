import {
  CURRENT_DATE,
  SELECTED_DATE,
  CREATE_BOOKING,
  CREATE_BOOKING_ERROR,
  CREATE_BOOKING_SUCCESS,
  FETCH_BOOKINGS,
  FETCH_BOOKINGS_ERROR,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_CALENDAR_BOOKINGS,
  FETCH_CALENDAR_BOOKINGS_ERROR,
  FETCH_CALENDAR_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS,
  FETCH_USER_BOOKINGS_ERROR,
  FETCH_USER_BOOKINGS_SUCCESS,
  EDIT_BOOKING,
  EDIT_BOOKING_ERROR,
  EDIT_BOOKING_SUCCESS,
  NEW_MESSAGE
} from '../constants';

import bookingsService from '../services/bookingService';

const handleError = (error, dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: {
      type: 'error',
      title: error,
      description: ''
    }
  })
}
export const createBooking = booking => async dispatch => {
  dispatch({
    type: CREATE_BOOKING,
    payload: null
  })
  bookingsService.create(booking)
    .then(booking => {
      dispatch({
        type: CREATE_BOOKING_SUCCESS,
        payload: booking.data
      })
    })
    .catch(error => {
      dispatch({
        type: CREATE_BOOKING_ERROR,
        payload: null
      })
      handleError(error, dispatch);
    });
}

export const getBookingsByDate = (service, date) => async dispatch => {
  dispatch({
    type: FETCH_BOOKINGS,
    payload: null
  })
  bookingsService.getBookingsByDate(service, date)
    .then(booking => {
      dispatch({
        type: FETCH_BOOKINGS_SUCCESS,
        payload: booking.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_BOOKINGS_ERROR,
        payload: null
      })
      handleError(error, dispatch);
    });
}

export const getBookingsByMonth = (service, date) => async dispatch => {
  dispatch({
    type: FETCH_CALENDAR_BOOKINGS,
    payload: null
  })
  bookingsService.getBookingsByMonth(service, date)
    .then(booking => {
      dispatch({
        type: FETCH_CALENDAR_BOOKINGS_SUCCESS,
        payload: booking.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_CALENDAR_BOOKINGS_ERROR,
        payload: null
      })
      handleError(error, dispatch);
    });
}

export const getBookingByAuthor = (service, userId) => async dispatch => {
  dispatch({
    type: FETCH_USER_BOOKINGS,
    payload: null
  });

  bookingsService.getBookingsByAuthor(service, userId)
    .then(booking => {
      dispatch({
        type: FETCH_USER_BOOKINGS_SUCCESS,
        payload: booking.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_USER_BOOKINGS_ERROR,
        payload: null
      })
      handleError(error, dispatch);
    });
}

export const patchBooking = booking => async dispatch => {
  dispatch({
    type: EDIT_BOOKING,
    payload: null
  })
  bookingsService.patchBooking(booking)
    .then(booking => {
      dispatch({
        type: EDIT_BOOKING_SUCCESS,
        payload: booking.data
      })
    })
    .catch(error => {
      dispatch({
        type: EDIT_BOOKING_ERROR,
        payload: null
      })
      handleError(error, dispatch);
    });
}

export const setCurrentDate = date => dispatch => {
  dispatch({
    type: CURRENT_DATE,
    payload: date
  })
}
export const setSelectedDate = date => dispatch => {
  dispatch({
    type: SELECTED_DATE,
    payload: date
  });
}