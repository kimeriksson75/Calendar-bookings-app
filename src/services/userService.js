import { users } from '../api';
import { handleError } from './handleError';

export const register = async user => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  return await users.post('/register', user, requestOptions)
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
export const signOut = () => {
  localStorage.removeItem('user');
}
const userService = {
  register,
  signIn,
  signOut,
}

export default userService;