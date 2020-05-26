import { TOGGLE_SIDEBAR } from '../constants';

const INIITAL_STATE = {
  showSidebar: false
}

export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      const { showSidebar } = state;
      const toggleSidebar = action.payload === false ? action.payload : showSidebar ? false : true;
      return { ...state, showSidebar: toggleSidebar };
    default:
      return state
  }
}