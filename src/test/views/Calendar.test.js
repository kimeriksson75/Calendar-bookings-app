import React from 'react';
import {
	render,
	screen,
	cleanup,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import Calendar from '../../views/Calendar'
import { Router } from 'react-router-dom';
import history from '../../history';
import '@testing-library/jest-dom';
import 'setimmediate';
// import io from 'socket.io-client';
// import mockio, {serverSocket, cleanUp } from 'socket.io-client';
import io from 'socket.io-client';


const mockStore = configureStore([]);
const store = mockStore({
	isFetching: false,
	auth: {
		isSignedIn: true,
		user: {
			_id: '658055edfaa7d604c938ec48',
			username: 'johndoe',
			email: 'johndoe@mail.com',
			firstname: 'John',
			lastname: 'Doe',
			residence: '65429601add7c81260092af3',
			roles: ['user'],
		},
	},
	service: {
		selectedService: {
			_id: '656b75c56c0a78cef01c9cf0',
			id: '656b75c56c0a78cef01c9cf0',
			name: 'Service 1',
			description: 'Service 1 description',
			residence: '65429601add7c81260092af3',
			__v: 0,
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
		},
	},
	bookingData: {
		calendarBookings: [{
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
		}],
	},
})


store.dispatch = jest.fn();
jest.spyOn(history, "push");
// jest.mock('../../actions/bookingActions', () => ({
// 	getBookingsByMonth: jest.fn((value) => {}),
// 	patchBooking: jest.fn((value) => {}),
// 	createBooking: jest.fn((value) => {}),
// }));
jest.mock('../../services/bookingService', () => ({
	getBookingsByMonth: jest.fn((value) => mockReturnValueOnce({ data: { booking: {} } })),
	patchBooking: jest.fn((value) => mockReturnValueOnce({ data: { booking: {}} })),
	createBooking: jest.fn((value) => mockReturnValueOnce({ data: { booking: {}} })),
}));
jest.mock('moment/locale/sv', () => {
	const moment = jest.requireActual('moment');
	moment.defineLocale('SE', {
		week: {
			dow: 1
		}
	});
  moment.now = () => +new Date('2023-12-01T12:33:37.000Z');
  return moment;
});
Date.now = jest.fn().mockReturnValue(new Date('2023-12-01T12:33:37.000Z'));

describe('Calendar', () => {
	beforeEach(() => {
		
		const props = {
			match: {
				params: {
					year: '2023',
					month: '12',
					day: '1',
					},
			},
	};
	render(
		<Provider store={store}>
			<Router history={history}>
				<Calendar {...props} />
			</Router>
		</Provider>
		)
	})
	
	afterEach(() => {
		cleanup();
	});
	
	afterAll(() => {
		jest.restoreAllMocks();
	})
	
	it('renders Calendar view', () => {
		const calendar = screen.getByTestId('calendar');
		expect(calendar).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Service 1/ })).toBeDefined();

		const calendarMenu = screen.getByTestId('calendar-menu');
		expect(calendarMenu).toBeInTheDocument();
		expect(calendarMenu).toHaveTextContent(/December 2023/);
		expect(screen.getByTestId('calendar-menu-prev-month')).toBeInTheDocument();
		expect(screen.getByTestId('calendar-menu-next-month')).toBeInTheDocument();

		const selectedDay = screen.getByTestId(1);
		expect(selectedDay).toBeInTheDocument();
		expect(selectedDay).toHaveClass('calendar-day calendar-day--today');
		expect(screen.getByRole('heading', { name: /Bokningar Fri 1 December/ })).toBeDefined();
		// expect(store.dispatch).toHaveBeenCalledTimes(1);  // this is good  <--

	});

	it('navigate to next month', async () => {
		const user = userEvent.setup()
		const nextMonthButton = screen.getByTestId('calendar-menu-next-month');
		expect(nextMonthButton).toBeInTheDocument();
		await user.click(nextMonthButton);
		expect(history.push).toHaveBeenCalledTimes(1);
		expect(history.location.pathname).toBe('/656b75c56c0a78cef01c9cf0/calendar/2024/01/1');
	});

	it('navigate to previous month', async () => {
		const user = userEvent.setup()
		const prevMonthButton = screen.getByTestId('calendar-menu-prev-month');
		expect(prevMonthButton).toBeInTheDocument();
		await user.click(prevMonthButton);
		expect(history.push).toHaveBeenCalledTimes(2);
		expect(history.location.pathname).toBe('/656b75c56c0a78cef01c9cf0/calendar/2023/11/1');
	});
});



describe('Calendar interactions', () => {
	// jest.mock('socket.io-client');

	// let fakeServerSocket
  // let fakeSocketClient
	beforeEach(() => {

		// fakeServerSocket = new MockedServerSocket()
    // fakeSocketClient = MockedServerSocket.socketClient

    // Since fakeServerSocket does not automatically emit a connect message as socketio io() does, simulate it here.
    // fakeServerSocket.on("connect", () => {
		// 	fakeServerSocket.emit("connect", { status: "success" });
		// 	fakeServerSocket.on("connect_error", () => {
		// 		console.log("Error connecting to socket.io server");
		// 	});
			
    // })
		// let mockSocket;

		jest.mock('socket.io-client', () => {
			const mSocket = {
				on: jest.fn((event, cb) => {
					if (event === 'connect') {
						cb();
					}
				}),
				emit: jest.fn((value) => console.log(value)),

			};
			return jest.fn(() => mSocket);
		});

		const props = {
			match: {
				params: {
					year: '2023',
					month: '12',
					day: '2',
					},
			},
	};
		render(
			<Provider store={store}>
				<Router history={history}>
					<Calendar {...props} />
				</Router>
			</Provider>
		)
	})
	
	afterEach(() => {
		cleanup();
		jest.restoreAllMocks();
	});

	it('renders selected calendar day and booking', async () => {
		const selectedDay = screen.getByTestId(2);
		expect(selectedDay).toBeInTheDocument();
		expect(selectedDay).toHaveClass('calendar-day calendar-day--selected');
		expect(screen.getByRole('heading', { name: /Bokningar Sat 2 December/ })).toBeDefined();
		const calendarDayBooking = screen.getByTestId('calendar-day-booking-0');
		expect(calendarDayBooking).toBeInTheDocument();
		expect(calendarDayBooking).toHaveClass('calendar-day-bookings-animate calendar-day-bookings--booked');
		expect(calendarDayBooking).toHaveTextContent(/07:00 - 10:00Doe/);
	});

	it('render other users bookings', async () => {
		const calendarDayBooking = screen.getByTestId('calendar-day-booking-2');
		expect(calendarDayBooking).toBeInTheDocument();
		expect(calendarDayBooking).toHaveClass('calendar-day-bookings-animate calendar-day-bookings--occupied');
		expect(calendarDayBooking).toHaveTextContent(/14:00 - 18:00rockyb/);
	});

	it('removes selected calendar day booking', async () => {
		const mockSocket = io('localhost:3000');

		const user = userEvent.setup()
		const calendarDayBooking = screen.getByTestId('calendar-day-booking-0');
		expect(calendarDayBooking).toBeInTheDocument();
		expect(calendarDayBooking).toHaveClass('calendar-day-bookings-animate calendar-day-bookings--booked');
		expect(calendarDayBooking).toHaveTextContent(/07:00 - 10:00Doe/);
		await user.click(calendarDayBooking);
		expect(calendarDayBooking).toHaveTextContent(/07:00 - 10:00/);
		expect(calendarDayBooking).not.toHaveClass('calendar-day-bookings--booked');
	});

	it('adds booking to selected calendar day', async () => {
		const user = userEvent.setup()
		const calendarDayBooking = screen.getByTestId('calendar-day-booking-3');
		expect(calendarDayBooking).toBeInTheDocument();
		expect(calendarDayBooking).toHaveClass('calendar-day-bookings-animate calendar-day-bookings--vacant');
		expect(calendarDayBooking).toHaveTextContent(/18:00 - 22:00/);
		await user.click(calendarDayBooking);
		expect(calendarDayBooking).toHaveTextContent(/18:00 - 22:00Doe/);
		expect(calendarDayBooking).not.toHaveClass('calendar-day-bookings--booked--booked');
	});
});