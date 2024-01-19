import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  USER_PROFILE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR
} from '../constants'

let user = JSON.parse(localStorage.getItem('user'));
let isSignedIn = user ? true : false;

const INITIAL_AUTH_STATE = {
  isSignedIn,
  isFetching: false,
  user: user ? user.data : null
};
export default (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, isSignedIn: false, isFetching: true, user: null };
    case SIGN_IN_SUCCESS:
      return { ...state, isSignedIn: true, isFetching: false, user: action.payload };
    case SIGN_IN_ERROR:
      return { ...state, isSignedIn: false, isFetching: false, user: null };
    case SIGN_OUT_REQUEST:
      return { ...state, isSignedIn: true, isFetching: true };
    case SIGN_OUT_SUCCESS:
      return { ...state, isSignedIn: false, isFetching: false, user: null };
    case SIGN_OUT_ERROR:
      return { ...state, isSignedIn: true, isFetching: false, user: null };
    case USER_PROFILE:
      return { ...state, userProfile: action.payload }
    case CREATE_USER:
      return { ...state, user: action.payload, isFetching: true, }
    case CREATE_USER_SUCCESS:
      return { ...state, user: action.payload, isFetching: false, }
    case CREATE_USER_ERROR:
      return { ...state, user: null, isFetching: false, }
    default:
      return state
  }
}