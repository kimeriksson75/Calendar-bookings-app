import ServiceReducer from '../../reducers/ServiceReducer';
import * as actions from '../../constants';

const initialState = {
    isFetching: false,
    selectedService: null,
};

const successServicesPayload = {
    services: [{
        id: '656b75c56c0a78cef01c9cf0',
        name: 'Service 1',
        description: 'Service 1 description',
        residence: '65429601add7c81260092af3',
        alternateTimeslots: [
            {
                _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
                userid: null,
                username: '',
                start: '2023-12-02T07:00:00.000Z',
                end: '2023-12-02T10:00:00.000Z',
                __v: 0,
            },
            {
                _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
                userid: null,
                username: '',
                start: '2023-12-02T10:00:00.000Z',
                end: '2023-12-02T14:00:00.000Z',
                __v: 0,
            },
            {
                _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
                userid: null,
                username: '',
                start: '2023-12-02T14:00:00.000Z',
                end: '2023-12-02T18:00:00.000Z',
                __v: 0,
            },
            {
                _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
                userid: null,
                username: '',
                start: '2023-12-02T18:00:00.000Z',
                end: '2023-12-02T22:00:00.000Z',
                __v: 0,
            }
        ],
        timeslots: [
            {
                _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
                userid: null,
                username: '',
                start: '2023-12-02T17:00:00.000Z',
                end: '2023-12-02T19:30:00.000Z',
                __v: 0,
            },
            {
                _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
                userid: null,
                username: '',
                start: '2023-12-02T19:30:00.000Z',
                end: '2023-12-02T22:00:00.000Z',
                __v: 0,
            },
        ],
    }]
};

describe('ServiceReducer', () => {
    it('should return the initial state', () => {
        expect(ServiceReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle FETCH_SERVICES', () => {
        expect(
            ServiceReducer(initialState, {
                type: actions.FETCH_SERVICES,
                payload: null,
            })
        ).toEqual({ isFetching: true, selectedService: null });
    });

    it('should handle FETCH_SERVICES_SUCCESS', () => {
        expect(
            ServiceReducer(initialState, {
                type: actions.FETCH_SERVICES_SUCCESS,
                payload: successServicesPayload,
            })
        ).toEqual({ isFetching: false, selectedService: null, services: successServicesPayload });
    });

    it('should handle FETCH_SERVICES_ERROR', () => {
        expect(
            ServiceReducer(initialState, {
                type: actions.FETCH_SERVICES_ERROR,
                payload: null,
            })
        ).toEqual({ isFetching: false, selectedService: null });
    });

    it('should handle FETCH_SERVICES_BY_RESIDENCE', () => {
        expect(
            ServiceReducer(initialState, {
                type: actions.FETCH_SERVICES_BY_RESIDENCE,
                payload: null,
            })
        ).toEqual({ isFetching: true, selectedService: null });
    });

    it('should handle FETCH_SERVICES_BY_RESIDENCE_SUCCESS', () => {
        expect(
            ServiceReducer(initialState, {
                type: actions.FETCH_SERVICES_BY_RESIDENCE_SUCCESS,
                payload: successServicesPayload,
            })
        ).toEqual({ isFetching: false, selectedService: null, services: successServicesPayload });
    });

    it('should handle FETCH_SERVICES_BY_RESIDENCE_ERROR', () => {
        expect(
            ServiceReducer(initialState, {
                type: actions.FETCH_SERVICES_BY_RESIDENCE_ERROR,
                payload: null,
            })
        ).toEqual({ isFetching: false, selectedService: null });
    });

    it('should handle SET_SELECTED_SERVICE', () => {
        expect(
            ServiceReducer(initialState, {
                type: actions.SET_SELECTED_SERVICE,
                payload: successServicesPayload.services[0],
            })
        ).toEqual({ isFetching: false, selectedService: successServicesPayload.services[0] });
    });
});