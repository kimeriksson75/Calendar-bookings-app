import { apartments, requestOptions } from '../api';
import { handleError } from './handleError';

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
