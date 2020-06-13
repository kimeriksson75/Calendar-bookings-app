import {
  FETCH_APARTMENTS,
  FETCH_APARTMENTS_ERROR,
  FETCH_APARTMENTS_SUCCESS,
  NEW_MESSAGE,
} from '../constants';
import apartmentService from '../services/apartmentsService';

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
export const getAvailableApartments = residence => async dispatch => {
  dispatch({
    type: FETCH_APARTMENTS,
    payload: null
  })
  apartmentService.getApartments(residence)
    .then(apartments => {
      dispatch({
        type: FETCH_APARTMENTS_SUCCESS,
        payload: apartments.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_APARTMENTS_ERROR,
        payload: null
      });
      handleError(error, dispatch);
    });
}