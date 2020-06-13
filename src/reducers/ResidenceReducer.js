import {
  FETCH_RESIDENCES,
  FETCH_RESIDENCES_ERROR,
  FETCH_RESIDENCES_SUCCESS,
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RESIDENCES:
      return { ...state, isFetching: true }
    case FETCH_RESIDENCES_ERROR:
      return { ...state, isFetching: false }
    case FETCH_RESIDENCES_SUCCESS:
      return { ...state, residences: action.payload, isFetching: false }
    default:
      return state
  }
}