import CalendarReducer from '../../reducers/CalendarReducer';
import * as actions from '../../constants';

const initialState = [];

describe('CalendarReducer', () => {
    it('should return the initial state', () => {
        expect(CalendarReducer([], {})).toEqual(initialState);
    });

    it('should handle CURRENT_DATE', () => {
        expect(
            CalendarReducer(initialState, {
                type: actions.CURRENT_DATE,
                payload: '2021-01-01',
            })
        ).toEqual({ currentDate: '2021-01-01' });
    });

    it('should handle SELECTED_DATE', () => {
        expect(
            CalendarReducer(initialState, {
                type: actions.SELECTED_DATE,
                payload: '2021-01-01',
            })
        ).toEqual({ selectedDate: '2021-01-01' });
    });
});