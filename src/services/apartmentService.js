import { apartments, requestOptions } from '../api';
import { handleError } from './handleError';

const getAvailableApartments = async residence => {
  return await apartments.get(`/residence/${residence}`, requestOptions())
    .then(apartments => {
      return Promise.resolve(apartments);
    })
    .catch(err => handleError(err))
}

const apartmentService = {
  getAvailableApartments
};

export default apartmentService;
