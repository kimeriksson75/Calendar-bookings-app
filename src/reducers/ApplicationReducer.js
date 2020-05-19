import { TOGGLE_SIDEBAR } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      const { showSidebar } = state;
      const toggleSidebar = action.payload === false ? action.payload : showSidebar ? false : true;
      return { ...state, showSidebar: toggleSidebar };
    default:
      return state
  }
}