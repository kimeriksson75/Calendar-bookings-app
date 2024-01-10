import ApartmentReducer from '../../reducers/ApartmentReducer';
import * as actions from '../../constants';

const initialState = [];

const successApartmentsPayload = {
    apartments: [{
        id: '65429601add7c81260092af3',
        name: 'Apartment 1',
        residence: '65429601add7c81260092af3',
    },{
        id: '65804dc3dc905731d8cfb0b4',
        name: 'Apartment 2',
        residence: '65429601add7c81260092af3',
    }],
}

describe('ApartmentReducer', () => {
    it('should return the initial state', () => {
        expect(ApartmentReducer([], {})).toEqual(initialState);
    });

    it('should handle FETCH_APARTMENTS', () => {
        expect(
            ApartmentReducer(initialState, {
                type: actions.FETCH_APARTMENTS,
                payload: null,
            })
        ).toEqual({ isFetching: true });
    });

    it('should handle FETCH_APARTMENTS_SUCCESS', () => {
        expect(
            ApartmentReducer(initialState, {
                type: actions.FETCH_APARTMENTS_SUCCESS,
                payload: successApartmentsPayload,
            })
        ).toEqual({ isFetching: false, apartments: successApartmentsPayload });
    });

    it('should handle FETCH_APARTMENTS_ERROR', () => {
        expect(
            ApartmentReducer(initialState, {
                type: actions.FETCH_APARTMENTS_ERROR,
                payload: null,
            })
        ).toEqual({ isFetching: false });
    });
})