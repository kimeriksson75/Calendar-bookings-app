import { services } from '../api';

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


const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};


const getServices = async () => {
  return await services.get(`/`, requestOptions)
    .then(services => {
      return Promise.resolve(services);
    })
    .catch(err => handleError(err))
}

const serviceService = {
  getServices
};

export default serviceService;
