import {
  FETCH_APARTMENTS,
  FETCH_APARTMENTS_ERROR,
  FETCH_APARTMENTS_SUCCESS,
} from '../constants';
import apartmentService from '../services/apartmentsService';
import { handleError } from './index';

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