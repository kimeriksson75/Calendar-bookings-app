import {
  FETCH_APARTMENTS,
  FETCH_APARTMENTS_ERROR,
  FETCH_APARTMENTS_SUCCESS,
} from '../constants';
import apartmentService from '../services/apartmentService';
import { handleError } from './index';

export const getAvailableApartments = residence => async dispatch => {
  dispatch({
    type: FETCH_APARTMENTS,
    payload: null
  })
  try {
    const result = await apartmentService.getAvailableApartments(residence)
    dispatch({
      type: FETCH_APARTMENTS_SUCCESS,
      payload: result.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_APARTMENTS_ERROR,
      payload: null
    })
    handleError(error, dispatch);
  }
}