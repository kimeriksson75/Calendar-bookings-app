import { CURRENT_DATE, SELECTED_DATE } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    case SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}