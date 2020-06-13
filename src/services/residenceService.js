import { residences, requestOptions } from '../api';

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

const getResidences = async () => {
  return await residences.get(`/`, requestOptions)
    .then(residences => {
      return Promise.resolve(residences);
    })
    .catch(err => handleError(err))
}

const residenceService = {
  getResidences
};

export default residenceService;
