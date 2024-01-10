import Services from '../../services/bookingService';
import { bookings } from '../../api';
import { handleError } from '../../services/handleError';
import _ from 'lodash';

jest.mock('../../services/handleError');
bookings.post = jest.fn();
bookings.get = jest.fn();
bookings.patch = jest.fn();

const bookingResponse = {
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
};
const bookingsResponse = [{
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
}];

const userId = '658055edfaa7d604c938ec48';

describe('bookingService create', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call create booking', async () => {
        bookings.post.mockImplementationOnce(() =>
            Promise.resolve({ data: bookingResponse })
        );
        const response = await Services.create(bookingResponse, userId);
        expect(response.data).toEqual(bookingResponse);
        expect(bookings.post).toHaveBeenCalledTimes(1);
        expect(bookings.post).toHaveBeenCalledWith(
            `/658055edfaa7d604c938ec48`,
            bookingResponse,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getBookings fails', async () => {
        const errorMessage = 'Network Error';
        bookings.post.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.create(bookingResponse, userId);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('bookingService getBookingsByDate', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getBookingsByDate', async () => {
        bookings.get.mockImplementationOnce(() =>
            Promise.resolve({ data: bookingsResponse })
        );
        const response = await Services.getBookingsByDate(bookingResponse.service, bookingResponse.date);
        expect(response.data).toEqual(bookingsResponse);
        expect(bookings.get).toHaveBeenCalledTimes(1);
        expect(bookings.get).toHaveBeenCalledWith(
            `/service/${bookingResponse.service}/date/${bookingResponse.date}`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getBookingsByDate fails', async () => {
        const errorMessage = 'Network Error';
        bookings.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getBookingsByDate(bookingResponse.service, bookingResponse.date);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('bookingService getBookingsByDateSpan', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getBookingsByDateSpan', async () => {
        bookings.get.mockImplementationOnce(() =>
            Promise.resolve({ data: bookingsResponse })
        );
        const response = await Services.getBookingsByDateSpan(bookingResponse.service, bookingResponse.date, bookingResponse.date);
        expect(response.data).toEqual(bookingsResponse);
        expect(bookings.get).toHaveBeenCalledTimes(1);
        expect(bookings.get).toHaveBeenCalledWith(
            `/service/${bookingResponse.service}/start/${bookingResponse.date}/end/${bookingResponse.date}`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getBookingsByDateSpan fails', async () => {
        const errorMessage = 'Network Error';
        bookings.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getBookingsByDateSpan(bookingResponse.service, bookingResponse.date, bookingResponse.date);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('bookingService getBookingsByMonth', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getBookingsByMonth', async () => {
        bookings.get.mockImplementationOnce(() =>
            Promise.resolve({ data: bookingsResponse })
        );
        const response = await Services.getBookingsByMonth(bookingResponse.service, bookingResponse.date);
        expect(response.data).toEqual(bookingsResponse);
        expect(bookings.get).toHaveBeenCalledTimes(1);
        expect(bookings.get).toHaveBeenCalledWith(
            `/service/${bookingResponse.service}/month/${bookingResponse.date}`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getBookingsByMonth fails', async () => {
        const errorMessage = 'Network Error';
        bookings.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getBookingsByMonth(bookingResponse.service, bookingResponse.date);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('bookingService getBookingsByAuthor', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getBookingsByAuthor', async () => {
        bookings.get.mockImplementationOnce(() =>
            Promise.resolve({ data: bookingsResponse })
        );
        const response = await Services.getBookingsByAuthor(bookingResponse.service, userId);
        expect(response.data).toEqual(bookingsResponse);
        expect(bookings.get).toHaveBeenCalledTimes(1);
        expect(bookings.get).toHaveBeenCalledWith(
            `/service/${bookingResponse.service}/user/${userId}`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getBookingsByAuthor fails', async () => {
        const errorMessage = 'Network Error';
        bookings.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getBookingsByAuthor(bookingResponse.service, userId);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('bookingService patchBooking', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call patchBooking', async () => {
        bookings.patch.mockImplementationOnce(() =>
            Promise.resolve({ data: bookingResponse })
        );
        const response = await Services.patchBooking(bookingResponse, userId);
        const modifiedBookingResponse = _.omit(bookingResponse, ['_id', 'id']);
        expect(response.data).toEqual(bookingResponse);
        expect(bookings.patch).toHaveBeenCalledTimes(1);
        expect(bookings.patch).toHaveBeenCalledWith(
            `/${userId}/${bookingResponse._id}`,
            modifiedBookingResponse,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when patchBooking fails', async () => {
        const errorMessage = 'Network Error';
        bookings.patch.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.patchBooking(bookingResponse, userId);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});