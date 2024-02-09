import history from '../history';
import {
  NEW_MESSAGE,
  TOGGLE_SIDEBAR,
  SIGN_OUT_SUCCESS,
  SET_LAYOUT
} from '../constants';
import { logout } from './userActions';
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

export const setLayout = (payload) => {
  return {
    type: SET_LAYOUT,
    payload
  }
}

export const handleError = ({status, statusText, message}, dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: {
      type: 'error',
      status,
      title: statusText,
      description: message
    }
  });
  if (status === 403) {
    dispatch({
      type: SIGN_OUT_SUCCESS,
      payload: null
    });
    const accessToken = JSON.parse(localStorage.getItem('user'))?.data?.accessToken
    const refreshToken = JSON.parse(localStorage.getItem('user'))?.data?.refreshToken
    if (accessToken && refreshToken) {
      history.push('/user/login');
      logout({
        refreshToken,
        accessToken
      });
    }
  }
}

export * from './userActions';
export * from './bookingActions';
export * from './serviceActions';
export * from './residenceActions';
export * from './apartmentActions';

