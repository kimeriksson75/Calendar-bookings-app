import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  REQUEST_NEW_PASSWORD,
  REQUEST_NEW_PASSWORD_SUCCESS,
  REQUEST_NEW_PASSWORD_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  USER_PROFILE,
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
  try {
    const result = await userService.register(user)
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: result.data
    })
    history.push('/user/login')
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        type: 'success',
        title: `${result.data.firstname} du har nu skapat en avändare`,
        description: `Logga in med ditt användarnamn ${result.data.username}.`
      }
    })
  } catch (error) {
    dispatch({
      type: CREATE_USER_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}
export const login = (username, password) => async dispatch => {
  dispatch({
    type: SIGN_IN_REQUEST,
    payload: null
  });
  try {
    const result = await userService.signIn(username, password)
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: result.data
    })
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        type: 'success',
        title: 'Inloggningen lyckades',
        description: `${result.data.firstname} du har nu tillgång till kalenderbokning.`
      }
    })
  } catch (error) {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const signInWithToken = (token) => async dispatch => {
  dispatch({
    type: SIGN_IN_REQUEST,
    payload: null
  });

  try {
    const result = await userService.signInWithToken(token)
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: result.data
    })
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        type: 'success',
        title: 'Inloggningen lyckades',
        description: 'Nu har du tillgång till kalenderbokning.'
      }
    })
  } catch (error) {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const logout = (tokens) => async dispatch => {
  
  dispatch({
    type: SIGN_OUT_REQUEST,
    payload: null
  });

  try {
    await userService.signOut(tokens)
    dispatch({
      type: SIGN_OUT_SUCCESS,
      payload: null
    })
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        type: 'success',
        title: 'Du har loggat ut',
        description: 'Du har nu loggat ut från kalenderbokning.'
      }
    })
  } catch (error) {
    dispatch({
      type: SIGN_OUT_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const requestNewPassword = email => async dispatch => {
  dispatch({
    type: REQUEST_NEW_PASSWORD,
    payload: null
  });

  try {
    await userService.requestNewPassword(email)
    dispatch({
      type: REQUEST_NEW_PASSWORD_SUCCESS,
      payload: null
    })
    history.push('/user/login')
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        type: 'success',
        title: 'Ett mail har skickats till din e-postadress',
        description: 'Följ instruktionerna i mailet för att återställa ditt lösenord.'
      }
    })
  } catch (error) {
    dispatch({
      type: REQUEST_NEW_PASSWORD_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}

export const setUserProfile = userProfile => {
  return {
    type: USER_PROFILE,
    payload: userProfile
  }
}