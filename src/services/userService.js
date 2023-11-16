import { users } from '../api';
import { handleError } from './handleError';

export const register = async user => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  return await users.post('/', user, requestOptions)
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(err => {
      return handleError(err);
    })
}

export const signIn = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return await users.post('/authenticate', { username, password }, requestOptions)
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
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return await users.post('/authenticate/token', { token }, requestOptions)
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
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return await users.post('/sign-out', { refreshToken, accessToken }, requestOptions) 
    .then(() => {
      localStorage.removeItem('user');
      return Promise.resolve();
    })
    .catch(err => {
      return handleError(err);
    })
}

export const requestNewPassword = async (email) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return await users.post('/reset-password-link', { email }, requestOptions)
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