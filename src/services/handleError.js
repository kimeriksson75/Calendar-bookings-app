export const handleError = err => {
  if (err.response) {
    const { data } = err.response;
    const response = data.message ? data.message : 'Unknown error';
    return Promise.reject(response);
  } else if (err.request) {
    return Promise.reject('request error');
  } else if (err.message) {
    return Promise.reject(err.message);
  } else {
    return Promise.reject('unknown error');
  }
}