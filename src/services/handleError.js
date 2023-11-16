export const handleError = err => {
  if (err.response) {
    console.log(err.response)
    const { data, status, statusText } = err.response;
    const errorObject  = {
      status,
      statusText,
      message: data?.message ? data.message : 'Unknown error'  ,
      errors: data.errors
    }
    return Promise.reject(errorObject);
  } else if (err.request) {
    return Promise.reject('request error');
  } else if (err.message) {
    return Promise.reject(err.message);
  } else {
    return Promise.reject('unknown error');
  }
}