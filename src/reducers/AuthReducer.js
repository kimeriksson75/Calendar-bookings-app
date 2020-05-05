import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  USER_PROFILE,
  CREATE_USER,
  CREATE_USER_SUCCESS
} from '../constants'

let user = JSON.parse(localStorage.getItem('user'));
let isSignedIn = user ? true : false;

const INITIAL_AUTH_STATE = {
  isSignedIn,
  user: user ? user.data : null
};
export default (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, isSignedIn: false, userId: action.payload };
    case SIGN_IN_SUCCESS:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_IN_ERROR:
      return { ...state, isSignedIn: false, user: null };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    case USER_PROFILE:
      return { ...state, userProfile: action.payload }
    case CREATE_USER:
      return { ...state, user: action.payload }
    case CREATE_USER_SUCCESS:
      return { ...state, user: action.payload }
    default:
      return state
  }
}