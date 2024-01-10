import React from 'react';
import {
	render,
	screen,
  cleanup,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import UserBookings from '../../views/UserBookings'
import { Router } from 'react-router-dom';
import history from '../../history';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const store = mockStore({
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
		services: [],
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
		userBookings: [{
			_id: '6580a01ffaa7d604c93901ce',
			service: '656b75c56c0a78cef01c9cf0',
			date: '2023-12-31T19:40:13.904Z',
			alternateTimeslots: [
				{
					_id: '5f9a7b8f3f5a6a1a0c5b6f2f',
					userid: '658055edfaa7d604c938ec48',
					username: 'johndoe',
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
		}],
		booking: [{
			_id: '6580a01ffaa7d604c93901ce',
			service: '656b75c56c0a78cef01c9cf0',
			date: '2023-12-31T19:40:13.904Z',
			alternateTimeslots: [
				{
					_id: '5f9a7b8f3f5a6a1a0c5b6f2f',
					userid: '658055edfaa7d604c938ec48',
					username: 'johndoe',
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
	},
})

store.dispatch = jest.fn();
jest.spyOn(history, "push");
jest.mock('moment', () => {
	const moment = jest.requireActual('moment');
	moment.now = () => +new Date('2023-12-01T12:33:37.000Z');
	return moment;
});
jest.mock('../../actions/bookingActions', () => ({
	getBookingsByAuthor: jest.fn((value) => {}),
}));

Date.now = jest.fn().mockReturnValue(new Date('2023-12-01T12:33:37.000Z'));

describe('UserBookings', () => {
	beforeEach(() => {

			render(
				<Provider store={store}>
					<Router history={history}>
						<UserBookings />
					</Router>
				</Provider>
			)
	})
	
	afterEach(() => {
		cleanup();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('renders UserBookings view', () => {
		expect(screen.getByRole('heading', { name: /Mina kommande bokningar/ })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Mina avslutade bokningar i/ })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /December/ })).toBeInTheDocument();
	});

	it('renders UserBookings upcoming bookings', async () => {
		const user = userEvent.setup()
		const upcomingUserBooking = screen.getByTestId('upcoming-user-bookings-btn');
		expect(upcomingUserBooking).toBeInTheDocument();
		expect(upcomingUserBooking).toHaveTextContent(/Sun 31st Dec 2023/);
		expect(upcomingUserBooking).toHaveTextContent(/07:00 - 10.00/);
		// await user.click(upcomingUserBooking);
		// expect(history.push).toHaveBeenCalledTimes(1);
		// expect(history.location.pathname).toBe('/656b75c56c0a78cef01c9cf0/calendar/2023/12/31');
	});
});

describe('UserBookings not signed in', () => {
	beforeEach(() => {

		render(
			<Provider store={
				mockStore({
					auth: {
						isSignedIn: false,
					},
					service: {
						services: [],
						selectedService: {},
					},
					bookingData: {
						userBookings: [],
						booking: [],
					},
				})
			}>
				<Router history={history}>
					<UserBookings />
				</Router>
			</Provider>
		)
})

afterEach(() => {
	cleanup();
});

afterAll(() => {
	jest.restoreAllMocks();
});
	
	it('renders UserBookings view with error message', () => {
		expect(screen.getByText(/Denna vy kräver inloggning./)).toBeInTheDocument();
		const loginLink = screen.getByRole('link', { name: /Logga in och försök igen/ });
		expect(loginLink).toBeInTheDocument();
		expect(loginLink.getAttribute('href')).toBe('/user/login');
		
	});
})