import {
  FETCH_SERVICES,
  FETCH_SERVICES_ERROR,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_BY_RESIDENCE,
  FETCH_SERVICES_BY_RESIDENCE_ERROR,
  FETCH_SERVICES_BY_RESIDENCE_SUCCESS,
  SET_SELECTED_SERVICE
} from '../constants';

let selectedService = JSON.parse(localStorage.getItem('service'));

const INIITAL_STATE = {
  isFetching: false,
  selectedService
}

export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SERVICES:
      return { ...state, isFetching: true }
    case FETCH_SERVICES_ERROR:
      return { ...state, isFetching: false }
    case FETCH_SERVICES_SUCCESS:
      return { ...state, services: action.payload, isFetching: false }
    case FETCH_SERVICES_BY_RESIDENCE:
      return { ...state, isFetching: true }
    case FETCH_SERVICES_BY_RESIDENCE_ERROR:
      return { ...state, isFetching: false }
    case FETCH_SERVICES_BY_RESIDENCE_SUCCESS:
      return { ...state, services: action.payload, isFetching: false }
    case SET_SELECTED_SERVICE:
      return { ...state, selectedService: action.payload }
    default:
      return state
  }
}