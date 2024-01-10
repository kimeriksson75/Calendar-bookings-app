import ResidenceReducer from '../../reducers/ResidenceReducer';
import * as actions from '../../constants';

const initialState = [];

const successResidencesPayload = {
    residences: [{
        id: '65429601add7c81260092af3',
        name: 'Residence 1',
        address: 'Address 1',
    },{
        id: '65804dc3dc905731d8cfb0b4',
        name: 'Residence 2',
        address: 'Address 2',
    }],
}

describe('ResidenceReducer', () => {
    it('should return the initial state', () => {
        expect(ResidenceReducer([], {})).toEqual(initialState);
    });

    it('should handle FETCH_RESIDENCES', () => {
        expect(
            ResidenceReducer(initialState, {
                type: actions.FETCH_RESIDENCES,
                payload: null,
            })
        ).toEqual({ isFetching: true });
    });

    it('should handle FETCH_RESIDENCES_SUCCESS', () => {
        expect(
            ResidenceReducer(initialState, {
                type: actions.FETCH_RESIDENCES_SUCCESS,
                payload: successResidencesPayload,
            })
        ).toEqual({ isFetching: false, residences: successResidencesPayload });
    });

    it('should handle FETCH_RESIDENCES_ERROR', () => {
        expect(
            ResidenceReducer(initialState, {
                type: actions.FETCH_RESIDENCES_ERROR,
                payload: null,
            })
        ).toEqual({ isFetching: false });
    });
});