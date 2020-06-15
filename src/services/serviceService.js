import { services, requestOptions } from '../api';
import { handleError } from './handleError';

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
