import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  REQUEST_NEW_PASSWORD,
  REQUEST_NEW_PASSWORD_SUCCESS,
  USER_PROFILE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  NEW_MESSAGE,
} from '../constants';
import userService from '../services/userService';
import history from '../history';
import { handleError } from './index';

export const createUser = user => async dispatch => {
  dispatch({
    type: CREATE_USER,
    payload: user
  });

  userService.register(user)
    .then(user => {
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
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: user.data
      })
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

export const signInWithToken = (token) => async dispatch => {
  dispatch({
    type: SIGN_IN_REQUEST,
    payload: null
  });
  console.log('user action signInWithToken', token)
  userService.signInWithToken(token)  
    .then((user) => {
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: user.data
      })
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

export const logout = (tokens) => dispatch => {
  
  dispatch({
    type: SIGN_OUT_REQUEST,
    payload: null
  });
  userService.signOut(tokens)
    .then(() => {
      dispatch({
        type: SIGN_OUT_SUCCESS,
        payload: null
      })
      history.push('/user/login')
      dispatch({
        type: NEW_MESSAGE,
        payload: {
          type: 'success',
          title: 'Du har loggat ut',
          description: 'Du har nu loggat ut från kalenderbokning.'
        }
      })
   })
  .catch(error => {
    handleError(error, dispatch);
  })
}

export const requestNewPassword = (email) => dispatch => {
  dispatch({
    type: REQUEST_NEW_PASSWORD,
    payload: null
  });

  userService.requestNewPassword(email)
    .then(() => {
      dispatch({
        type: REQUEST_NEW_PASSWORD_SUCCESS,
        payload: null
      })
      // history.push('/user/login')
      dispatch({
        type: NEW_MESSAGE,
        payload: {
          type: 'success',
          title: 'Du har begärt ett nytt lösenord',
          description: 'Ett länk har skickats till din e-post.'
        }
      })
    })
    .catch(error => {
      handleError(error, dispatch);
    })
}
export const setUserProfile = userProfile => {
  return {
    type: USER_PROFILE,
    payload: userProfile
  }
}