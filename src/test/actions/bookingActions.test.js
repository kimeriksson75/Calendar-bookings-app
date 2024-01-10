import * as actions from '../../actions/bookingActions';
import Services from '../../services/bookingService';
import * as types from '../../constants';

const booking = {
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
Services.create = jest.fn();
Services.getBookingsByDate = jest.fn();
Services.getBookingsByDateSpan = jest.fn();
Services.getBookingsByMonth = jest.fn();
Services.getBookingsByAuthor = jest.fn();
Services.patchBooking = jest.fn();


describe('create booking action', () => {
    it('should create an action to create a booking', async () => {
        const dispatch = jest.fn();
        
        Services.create.mockImplementationOnce(async () => Promise.resolve({
            data: booking,
        }));
        const id = '6580a01ffaa7d604c93901ce';
        const initialCreateBookingAction = {
            type: types.CREATE_BOOKING,
            payload: null,
        };
        const createBookingSuccessAction = {
            type: types.CREATE_BOOKING_SUCCESS,
            payload: booking,
        };
        await actions.createBooking(booking, id)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialCreateBookingAction);
                expect(dispatch).toHaveBeenCalledWith(createBookingSuccessAction);
            });
    });

    it('should handle create booking error', async () => {
        const dispatch = jest.fn();
        Services.create.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const id = '6580a01ffaa7d604c93901ce';
        const initialCreateBookingAction = {
            type: types.CREATE_BOOKING,
            payload: null,
        };
        const createBookingErrorAction = {
            type: types.CREATE_BOOKING_ERROR,
            payload: null,
        };
        await actions.createBooking(booking, id)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialCreateBookingAction);
                expect(dispatch).toHaveBeenCalledWith(createBookingErrorAction);
            });
    });
});

describe('get bookings by date action', () => {
    it('should create an action to get bookings by date', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByDate.mockImplementationOnce(async () => Promise.resolve({
            data: booking,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_BOOKINGS,
            payload: null,
        };
        const fetchBookingsSuccessAction = {
            type: types.FETCH_BOOKINGS_SUCCESS,
            payload: booking,
        };
        await actions.getBookingsByDate(booking.service, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsSuccessAction);
            });
    });

    it('should handle get bookings by date error', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByDate.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_BOOKINGS,
            payload: null,
        };
        const fetchBookingsErrorAction = {
            type: types.FETCH_BOOKINGS_ERROR,
            payload: null,
        };
        await actions.getBookingsByDate(booking.service, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsErrorAction);
            });
    });
});

describe('get bookings by date span action', () => {
    it('should create an action to get bookings by date span', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByDateSpan.mockImplementationOnce(async () => Promise.resolve({
            data: booking,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_BOOKINGS,
            payload: null,
        };
        const fetchBookingsSuccessAction = {
            type: types.FETCH_BOOKINGS_SUCCESS,
            payload: booking,
        };
        await actions.getBookingsByDateSpan(booking.service, booking.date, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsSuccessAction);
            });
    });

    it('should handle get bookings by date span error', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByDateSpan.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_BOOKINGS,
            payload: null,
        };
        const fetchBookingsErrorAction = {
            type: types.FETCH_BOOKINGS_ERROR,
            payload: null,
        };
        await actions.getBookingsByDateSpan(booking.service, booking.date, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsErrorAction);
            });
    });
});

describe('get bookings by month action', () => {
    it('should create an action to get bookings by month', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByMonth.mockImplementationOnce(async () => Promise.resolve({
            data: booking,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_CALENDAR_BOOKINGS,
            payload: null,
        };
        const fetchBookingsSuccessAction = {
            type: types.FETCH_CALENDAR_BOOKINGS_SUCCESS,
            payload: booking,
        };
        await actions.getBookingsByMonth(booking.service, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsSuccessAction);
            });
    });

    it('should handle get bookings by month error', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByMonth.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_CALENDAR_BOOKINGS,
            payload: null,
        };
        const fetchBookingsErrorAction = {
            type: types.FETCH_CALENDAR_BOOKINGS_ERROR,
            payload: null,
        };
        await actions.getBookingsByMonth(booking.service, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsErrorAction);
            });
    });
});

describe('get bookings by author action', () => {
    it('should create an action to get bookings by author', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByAuthor.mockImplementationOnce(async () => Promise.resolve({
            data: booking,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_USER_BOOKINGS,
            payload: null,
        };
        const fetchBookingsSuccessAction = {
            type: types.FETCH_USER_BOOKINGS_SUCCESS,
            payload: booking,
        };
        await actions.getBookingsByAuthor(booking.service, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsSuccessAction);
            });
    });

    it('should handle get bookings by author error', async () => {
        const dispatch = jest.fn();
        Services.getBookingsByAuthor.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialFetchBookingsAction = {
            type: types.FETCH_USER_BOOKINGS,
            payload: null,
        };
        const fetchBookingsErrorAction = {
            type: types.FETCH_USER_BOOKINGS_ERROR,
            payload: null,
        };
        await actions.getBookingsByAuthor(booking.service, booking.date)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialFetchBookingsAction);
                expect(dispatch).toHaveBeenCalledWith(fetchBookingsErrorAction);
            });
    });
});

describe('patch booking action', () => {
    it('should create an action to patch a booking', async () => {
        const dispatch = jest.fn();
        Services.patchBooking.mockImplementationOnce(async () => Promise.resolve({
            data: booking,
        }));
        const initialPatchBookingAction = {
            type: types.EDIT_BOOKING,
            payload: null,
        };
        const patchBookingSuccessAction = {
            type: types.EDIT_BOOKING_SUCCESS,
            payload: booking,
        };
        await actions.patchBooking(booking, booking._id)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialPatchBookingAction);
                expect(dispatch).toHaveBeenCalledWith(patchBookingSuccessAction);
            });
    });

    it('should handle patch booking error', async () => {
        const dispatch = jest.fn();
        Services.patchBooking.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialPatchBookingAction = {
            type: types.EDIT_BOOKING,
            payload: null,
        };
        const editBookingErrorAction = {
            type: types.EDIT_BOOKING_ERROR,
            payload: null,
        };
        await actions.patchBooking(booking, booking._id)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialPatchBookingAction);
                expect(dispatch).toHaveBeenCalledWith(editBookingErrorAction);
            });
    });

    it('should set current date', () => {
        const dispatch = jest.fn();
        const date = new Date();
        const expectedAction = {
            type: types.CURRENT_DATE,
            payload: date,
        };
        actions.setCurrentDate(date)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should set selected date', () => {
        const dispatch = jest.fn();

        const date = new Date();
        const expectedAction = {
            type: types.SELECTED_DATE,
            payload: date,
        };
        actions.setSelectedDate(date)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
});
