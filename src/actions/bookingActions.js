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
import { handleError } from './index';

export const createBooking = (booking, userId) => async dispatch => {

  dispatch({
    type: CREATE_BOOKING,
    payload: null
  })

  try {
    const result = await bookingsService.create(booking, userId)
    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: result.data
    })
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        type: 'success',
        title: 'Bokning registrerad',
        description: 'Bokning registrerad.'
      }
    })
  } catch (error) {  
    dispatch({
      type: CREATE_BOOKING_ERROR,
      payload: null
    })
      handleError(error, dispatch);
    }
}

export const getBookingsByDate = (service, date) => async dispatch => {
  dispatch({
    type: FETCH_BOOKINGS,
    payload: null
  })
  try {
    const result = await bookingsService.getBookingsByDate(service, date)
    dispatch({
      type: FETCH_BOOKINGS_SUCCESS,
      payload: result.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_BOOKINGS_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const getBookingsByDateSpan = (service, start, end) => async dispatch => {
  dispatch({
    type: FETCH_BOOKINGS,
    payload: null
  })

  try {
    const result = await bookingsService.getBookingsByDateSpan(service, start, end)
    dispatch({
      type: FETCH_BOOKINGS_SUCCESS,
      payload: result.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_BOOKINGS_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const getBookingsByMonth = (service, date) => async dispatch => {
  dispatch({
    type: FETCH_CALENDAR_BOOKINGS,
    payload: null
  })

  try {
    const result = await bookingsService.getBookingsByMonth(service, date)
    dispatch({
      type: FETCH_CALENDAR_BOOKINGS_SUCCESS,
      payload: result.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_CALENDAR_BOOKINGS_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const getBookingsByAuthor = (service, userId) => async dispatch => {
  dispatch({
    type: FETCH_USER_BOOKINGS,
    payload: null
  });
  try {
    const result = await bookingsService.getBookingsByAuthor(service, userId)
    dispatch({
      type: FETCH_USER_BOOKINGS_SUCCESS,
      payload: result.data
    })
  
  } catch (error) {
    dispatch({
      type: FETCH_USER_BOOKINGS_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const patchBooking = (booking, userId, remove = false) => async dispatch => {
  dispatch({
    type: EDIT_BOOKING,
    payload: null
  })

  try {
    const patchedBooking = await bookingsService.patchBooking(booking, userId)
    dispatch({
      type: EDIT_BOOKING_SUCCESS,
      payload: patchedBooking.data
    })
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        type: 'success',
        title: 'Bokning uppdaterad',
        description: `Bokning ${remove ? 'avregistrerad' : 'registrerad'}.`
      }
    })
  } catch (error) {
    dispatch({
      type: EDIT_BOOKING_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
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