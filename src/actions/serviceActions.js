import {
  FETCH_SERVICES,
  FETCH_SERVICES_ERROR,
  FETCH_SERVICES_SUCCESS,
  SET_SELECTED_SERVICE,
  NEW_MESSAGE,
} from '../constants';
import serviceService from '../services/serviceService';

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