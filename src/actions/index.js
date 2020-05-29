import {
  NEW_MESSAGE,
  TOGGLE_SIDEBAR,
} from '../constants';

export * from './userActions';
export * from './bookingActions';
export * from './serviceActions';

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
