import { residences, requestOptions } from '../api';
import { handleError } from './handleError';

const getAvailableResidences = async () => {
  return await residences.get(`/`, requestOptions())
    .then(residences => {
      return Promise.resolve(residences);
    })
    .catch(err => handleError(err))
}

const residenceService = {
  getAvailableResidences
};

export default residenceService;
