import BookingReducer from '../../reducers/BookingReducer';
import * as actions from '../../constants';

const initialState = {
    isFetching: false,
};
const successBookingPayload = {
    booking: {
        _id: '6580a01ffaa7d604c93901ce',
        service: '656b75c56c0a78cef01c9cf0',
        date: '2023-12-02T19:40:13.904Z',
        alternateTimeslots: [
            {
                _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
                userid: '658055edfaa7d604c938ec48',
                username: 'Doe',
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
                userid: '658f184214e0f36be38c4e8d',
                username: 'rockyb',
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
    }
}

const successUserBookingsPayload = {
    userBookings: [successBookingPayload.booking]
}

const successCalendarBookingsPayload = {
    calendarBookings: [successBookingPayload.booking]
}
describe('BookingReducer create booking', () => {
    it('should initiate CREATE_BOOKING', () => {
        const newState = BookingReducer(initialState, {
            type: actions.CREATE_BOOKING,
            payload: null
        });
        expect(newState.isFetching).toEqual(true);
    });
    it('should return CREATE_BOOKING_SUCCESS with payload', () => {
        const newState = BookingReducer(initialState, {
            type: actions.CREATE_BOOKING_SUCCESS,
            payload: successBookingPayload
        });
        expect(newState.booking).toEqual(successBookingPayload);
    });

    it('should return CREATE_BOOKING_ERROR', () => {
        const newState = BookingReducer(initialState, {
            type: actions.CREATE_BOOKING_ERROR,
            payload: null
        });
        expect(newState.isFetching).toEqual(false);
    });
});

describe('BookingReducer fetch bookings', () => {
    it('should initiate FETCH_BOOKINGS', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_BOOKINGS,
            payload: null
        });
        expect(newState.isFetching).toEqual(true);
    });
    it('should return FETCH_BOOKINGS_SUCCESS with payload', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_BOOKINGS_SUCCESS,
            payload: successBookingPayload
        });
        expect(newState.booking).toEqual(successBookingPayload);
    });

    it('should return FETCH_BOOKINGS_ERROR', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_BOOKINGS_ERROR,
            payload: null
        });
        expect(newState.isFetching).toEqual(false);
    });
});

describe('BookingReducer fetch calendar bookings', () => {
    it('should initiate FETCH_CALENDAR_BOOKINGS', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_CALENDAR_BOOKINGS,
            payload: null
        });
        expect(newState.isFetching).toEqual(true);
    });
    it('should return FETCH_CALENDAR_BOOKINGS_SUCCESS with payload', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_CALENDAR_BOOKINGS_SUCCESS,
            payload: successCalendarBookingsPayload
        });
        expect(newState.calendarBookings).toEqual(successCalendarBookingsPayload);
    });

    it('should return FETCH_CALENDAR_BOOKINGS_ERROR', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_CALENDAR_BOOKINGS_ERROR,
            payload: null
        });
        expect(newState.isFetching).toEqual(false);
    });
});

describe('BookingReducer fetch user bookings', () => {
    it('should initiate FETCH_USER_BOOKINGS', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_USER_BOOKINGS,
            payload: null
        });
        expect(newState.isFetching).toEqual(true);
    });
    it('should return FETCH_USER_BOOKINGS_SUCCESS with payload', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_USER_BOOKINGS_SUCCESS,
            payload: successUserBookingsPayload
        });
        expect(newState.userBookings).toEqual(successUserBookingsPayload);
    });

    it('should return FETCH_USER_BOOKINGS_ERROR', () => {
        const newState = BookingReducer(initialState, {
            type: actions.FETCH_USER_BOOKINGS_ERROR,
            payload: null
        });
        expect(newState.isFetching).toEqual(false);
    });
});

describe('BookingReducer edit booking', () => {
    it('should initiate EDIT_BOOKING', () => {
        const newState = BookingReducer(initialState, {
            type: actions.EDIT_BOOKING,
            payload: null
        });
        expect(newState.isFetching).toEqual(true);
    });
    it('should return EDIT_BOOKING_SUCCESS with payload', () => {
        const newState = BookingReducer(initialState, {
            type: actions.EDIT_BOOKING_SUCCESS,
            payload: successBookingPayload
        });
        expect(newState.booking).toEqual(successBookingPayload);
    });

    it('should return EDIT_BOOKING_ERROR', () => {
        const newState = BookingReducer(initialState, {
            type: actions.EDIT_BOOKING_ERROR,
            payload: null
        });
        expect(newState.isFetching).toEqual(false);
    });
});

describe('BookingReducer handle default state', () => {
    it('should return default state', () => {
        const newState = BookingReducer(initialState, {
            type: 'default',
            payload: null
        });
        expect(newState).toEqual(initialState);
    });
});