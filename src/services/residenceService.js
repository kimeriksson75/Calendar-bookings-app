import { residences, requestOptions } from '../api';
import { handleError } from './handleError';

const getResidences = async () => {
  return await residences.get(`/`, requestOptions())
    .then(residences => {
      return Promise.resolve(residences);
    })
    .catch(err => handleError(err))
}

const residenceService = {
  getResidences
};

export default residenceService;
