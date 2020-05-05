import { NEW_MESSAGE } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return ({ ...state, message: action.payload })
    default:
      return state
  }
}