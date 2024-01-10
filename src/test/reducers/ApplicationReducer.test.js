import ApplicationReducer from '../../reducers/ApplicationReducer';
import * as actions from '../../constants';

const initialState = {
    showSidebar: false,
};

describe('ApplicationReducer', () => {
    it('should return the initial state', () => {
        expect(ApplicationReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle TOGGLE_SIDEBAR', () => {
        expect(
            ApplicationReducer(initialState, {
                type: actions.TOGGLE_SIDEBAR,
                payload: false,
            })
        ).toEqual({ showSidebar: false });
        
        expect(
            ApplicationReducer(initialState, {
                type: actions.TOGGLE_SIDEBAR,
                payload: true,
            })
        ).toEqual({ showSidebar: true });
    });

    it('should handle SET_LAYOUT', () => {
        expect(
            ApplicationReducer(initialState, {
                type: actions.SET_LAYOUT,
                payload: 'default',
            })
        ).toEqual({
            showSidebar: false,
            layout: 'default'
        });
    });
});