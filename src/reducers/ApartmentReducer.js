import {
  FETCH_APARTMENTS,
  FETCH_APARTMENTS_ERROR,
  FETCH_APARTMENTS_SUCCESS,
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_APARTMENTS:
      return { ...state, isFetching: true }
    case FETCH_APARTMENTS_ERROR:
      return { ...state, isFetching: false }
    case FETCH_APARTMENTS_SUCCESS:
      return { ...state, apartments: action.payload, isFetching: false }
    default:
      return state
  }
}