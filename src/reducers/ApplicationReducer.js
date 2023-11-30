import { TOGGLE_SIDEBAR, SET_LAYOUT } from '../constants';

const INIITAL_STATE = {
  showSidebar: false,
  // layout: 'default'
}

export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      const { showSidebar } = state;
      const toggleSidebar = action.payload === false ? action.payload : showSidebar ? false : true;
      return { ...state, showSidebar: toggleSidebar };
    case SET_LAYOUT:
      return { ...state, layout: action.payload };
    default:
      return state
  }
}