import {
  FETCH_SERVICES,
  FETCH_SERVICES_ERROR,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_BY_RESIDENCE,
  FETCH_SERVICES_BY_RESIDENCE_ERROR,
  FETCH_SERVICES_BY_RESIDENCE_SUCCESS,
  SET_SELECTED_SERVICE,
} from '../constants';
import serviceService from '../services/serviceService';
import { handleError } from './index';

export const getAvailableServices = () => async dispatch => {
  dispatch({
    type: FETCH_SERVICES,
    payload: null
  })
  serviceService.getServices()
    .then(services => {
      dispatch({
        type: FETCH_SERVICES_SUCCESS,
        payload: services.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_SERVICES_ERROR,
        payload: null
      });
      handleError(error, dispatch);
    });
}

export const getServicesByResidence = residence => async dispatch => {
  dispatch({
    type: FETCH_SERVICES_BY_RESIDENCE,
    payload: null
  })
  serviceService.getServicesByResidence(residence)
    .then(services => {
      dispatch({
        type: FETCH_SERVICES_BY_RESIDENCE_SUCCESS,
        payload: services.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_SERVICES_BY_RESIDENCE_ERROR,
        payload: null
      })
      handleError(error, dispatch);
    });
}

export const setSelectedService = service => dispatch => {
  dispatch({
    type: SET_SELECTED_SERVICE,
    payload: service
  });
  localStorage.setItem('service', JSON.stringify(service));
}
export const unsetSelectedService = () => dispatch => {
  dispatch({
    type: SET_SELECTED_SERVICE,
    payload: null,
  });
  localStorage.removeItem('service');
}