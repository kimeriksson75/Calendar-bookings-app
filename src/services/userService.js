import { users } from '../api';

const handleError = err => {
  if (err.response) {
    const { data } = err.response;
    const response = data.message ? data.message : 'Unknown error';
    return Promise.reject(response);
  } else if (err.request) {
    console.log('err.request', err.request)
    return Promise.reject('request error');
  } else if (err.message) {
    console.log('err.message', err.message)
    return Promise.reject(err.message);
  } else {
    console.log('err', err)
    return Promise.reject('unknown error');
  }
}

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
  localStorage.removeItem('service');
}
const userService = {
  register,
  signIn,
  signOut,
}

export default userService;