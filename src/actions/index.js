import {
  CURRENT_DATE,
  SELECTED_DATE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  USER_PROFILE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_BOOKING,
  FETCH_BOOKINGS,
  FETCH_CALENDAR_BOOKINGS,
  FETCH_USER_BOOKINGS,
  EDIT_BOOKING,
  DELETE_BOOKING,
  NEW_MESSAGE
} from '../constants';
import history from '../history';
import { bookings } from '../api';
import userService from '../services/userService';
import bookingsService from '../services/bookingService';

const handleError = (error, dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: {
      type: 'error',
      message: error,
    }
  })
}
export const createBooking = booking => async dispatch => {
  bookingsService.create(booking)
    .then(booking => {
      dispatch({
        type: CREATE_BOOKING,
        payload: booking.data
      })
    })
    .catch(error => {
      handleError(error, dispatch);
    });
}

export const getBookingsByDate = date => async dispatch => {
  bookingsService.getBookingsByDate(date)
    .then(booking => {
      dispatch({
        type: FETCH_BOOKINGS,
        payload: booking.data
      })
    })
    .catch(error => {
      handleError(error, dispatch);
    });
}

export const getBookingsByMonth = date => async dispatch => {
  bookingsService.getBookingsByMonth(date)
    .then(booking => {
      dispatch({
        type: FETCH_CALENDAR_BOOKINGS,
        payload: booking.data
      })
    })
    .catch(error => {
      handleError(error, dispatch);
    });
}

export const getBookingByAuthor = userId => async dispatch => {
  bookingsService.getBookingsByAuthor(userId)
    .then(booking => {
      dispatch({
        type: FETCH_USER_BOOKINGS,
        payload: booking.data
      })
    })
    .catch(error => {
      handleError(error, dispatch);
    });
}

export const patchBooking = booking => async dispatch => {
  bookingsService.patchBooking(booking)
    .then(booking => {
      dispatch({
        type: EDIT_BOOKING,
        payload: booking.data
      })
    })
    .catch(error => {
      handleError(error, dispatch);
    });
}

export const deleteBooking = booking => async dispatch => {
  const { id } = booking;
  const response = await bookings.delete(`/bookings/${id}`);
  dispatch({
    type: DELETE_BOOKING,
    payload: response.data
  })
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

export const createUser = user => async dispatch => {
  dispatch({
    type: CREATE_USER,
    payload: user
  });

  userService.register(user)
    .then(user => {
      console.log(user.data)
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user.data
      })
      history.push('/user/login')
    })
    .catch(error => {
      handleError(error, dispatch);
    })
}

export const login = (username, password) => async dispatch => {
  dispatch({
    type: SIGN_IN_REQUEST,
    payload: null
  });

  userService.signIn(username, password)
    .then(user => {
      console.log('user', user)
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: user.data
      })
      history.push('/')

    })
    .catch(error => {
      handleError(error, dispatch);
    })
}

export const logout = () => dispatch => {
  userService.signOut();
  dispatch({
    type: SIGN_OUT,
    payload: null
  });
  history.push('/user/login')

}

export const setUserProfile = userProfile => {
  return {
    type: USER_PROFILE,
    payload: userProfile
  }
}

export const newMessage = message => {
  return {
    type: NEW_MESSAGE,
    payload: message
  }
}
