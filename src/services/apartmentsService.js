import { apartments, requestOptions } from '../api';

const handleError = err => {
  if (err.response) {
    const { data } = err.response;
    const response = data.message ? data.message : 'Unknown error';
    return Promise.reject(response);
  } else if (err.request) {
    console.log('err.request', err.request.responseText)
    return Promise.reject('request error');
  } else if (err.message) {
    console.log('err.message', err.message)
    return Promise.reject(err.message);
  } else {
    console.log('err', err)
    return Promise.reject('unknown error');
  }
}

const getApartments = async residence => {
  return await apartments.get(`/${residence}`, requestOptions)
    .then(apartments => {
      return Promise.resolve(apartments);
    })
    .catch(err => handleError(err))
}

const apartmentService = {
  getApartments
};

export default apartmentService;
