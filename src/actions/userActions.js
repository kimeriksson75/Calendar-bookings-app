import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  USER_PROFILE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  NEW_MESSAGE,
} from '../constants';
import userService from '../services/userService';
import history from '../history';

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