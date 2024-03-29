import { services, requestOptions } from '../api';
import { handleError } from './handleError';

const getAvailableServices = async () => {
  return await services.get(`/`, requestOptions())
    .then(services => {
      return Promise.resolve(services);
    })
    .catch(err => handleError(err))
}

const getServicesByResidence = async residence => {
  return await services.get(`/residence/${residence}`, requestOptions())
    .then(services => {
      return Promise.resolve(services);
    })
    .catch(err => handleError(err))
}

const serviceService = {
  getAvailableServices,
  getServicesByResidence
};

export default serviceService;
