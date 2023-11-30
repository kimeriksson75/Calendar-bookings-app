import { auth, users, requestOptions } from '../api';
import { handleError } from './handleError';

export const register = async user => {
  return await users.post('/', user, requestOptions())
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(err => {
      return handleError(err);
    })
}

export const signIn = async (username, password) => {

  return await auth.post('/', { username, password }, requestOptions())
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return Promise.resolve(user);
    })
    .catch(err => {
      return handleError(err);
    })
}

export const signInWithToken = async (token) => {

  return await users.post('/authenticate/token', { token }, requestOptions())
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return Promise.resolve(user);
    })
    .catch(err => {
      return handleError(err);
    })
}
export const signOut = async ({ refreshToken, accessToken}) => {

  return await users.post('/sign-out', { refreshToken, accessToken }, requestOptions()) 
    .then(() => {
      localStorage.removeItem('user');
      return Promise.resolve();
    })
    .catch(err => {
      return handleError(err);
    })
}

export const requestNewPassword = async (email) => {

  return await users.post('/reset-password-link', { email }, requestOptions())
    .then(() => {
      return Promise.resolve();
    })
    .catch(err => {
      return handleError(err);
    })
}

const userService = {
  register,
  signIn,
  signInWithToken,
  signOut,
  requestNewPassword,
}

export default userService;