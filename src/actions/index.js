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
  FETCH_SERVICES,
  FETCH_SERVICES_ERROR,
  FETCH_SERVICES_SUCCESS,
  SET_SELECTED_SERVICE,
  NEW_MESSAGE,
  TOGGLE_SIDEBAR,
} from '../constants';
import history from '../history';
import userService from '../services/userService';
import bookingsService from '../services/bookingService';
import serviceService from '../services/serviceService';

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
export const getAvailableServices = () => async dispatch => {
  dispatch({
    type: FETCH_SERVICES,
    payload: null
  })
  serviceService.getServices()
    .then(services => {
      dispatch({
        type: FETCH_SERVICES_SUCCESS,
        payload: services.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_SERVICES_ERROR,
        payload: null
      });
      handleError(error, dispatch);
    });
}

export const setSelectedService = service => dispatch => {
  dispatch({
    type: SET_SELECTED_SERVICE,
    payload: service
  });
  localStorage.setItem('service', JSON.stringify(service));
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
      dispatch({
        type: NEW_MESSAGE,
        payload: {
          type: 'success',
          title: `${user.data.firstname} du har nu skapat en avändare`,
          description: `Logga in med ditt användarnamn ${user.data.username}.`
        }
      })
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
      history.push('/');
      dispatch({
        type: NEW_MESSAGE,
        payload: {
          type: 'success',
          title: 'Inloggningen lyckades',
          description: 'Nu har du tillgång till kalenderbokning.'
        }
      })

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

export const toggleSidebar = (value = null) => {
  const payload = typeof value === "boolean" ? value : null;
  return {
    type: TOGGLE_SIDEBAR,
    payload
  }
}
