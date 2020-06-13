import {
  FETCH_RESIDENCES,
  FETCH_RESIDENCES_ERROR,
  FETCH_RESIDENCES_SUCCESS,
  NEW_MESSAGE,
} from '../constants';
import residenceService from '../services/residenceService';

const handleError = (error, dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: {
      type: 'error',
      title: error,
      description: ''
    }
  })
}
export const getAvailableResidences = () => async dispatch => {
  dispatch({
    type: FETCH_RESIDENCES,
    payload: null
  })
  residenceService.getResidences()
    .then(residences => {
      dispatch({
        type: FETCH_RESIDENCES_SUCCESS,
        payload: residences.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_RESIDENCES_ERROR,
        payload: null
      });
      handleError(error, dispatch);
    });
}