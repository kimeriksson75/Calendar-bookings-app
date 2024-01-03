import React from 'react';
import {
	render,
	screen,
  cleanup,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import Home from '../../views/Home'
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
		},
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
		]
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

Date.now = jest.fn().mockReturnValue(new Date('2023-12-01T12:33:37.000Z'));

describe('Home', () => {
	beforeEach(() => {

		render(
					<Provider store={store}>
							<Router history={history}>
									<Home />
							</Router>
					</Provider>
			)
    })
    
	afterEach(() => {
		cleanup();
	});

	it('renders home view', () => {
		expect(screen.getByRole('heading', { name: /Välkommen/ })).toBeDefined();
		expect(screen.getByText(/till Service 1/)).toBeDefined();
	});

	it('renders current date', () => {
		expect(screen.getByText(/Friday/)).toBeDefined();
		expect(screen.getByText(1)).toBeDefined();
		expect(screen.getByText(/13:33/)).toBeDefined();
	});
	
	it('renders next available timeslot widget', async () => {
		const nextAvailableTimeslot = screen.getByTestId('next-available-timeslot');
		expect(nextAvailableTimeslot).toBeInTheDocument();
		expect(nextAvailableTimeslot).toHaveTextContent((/Nästa tillgängliga bokning/));
		expect(nextAvailableTimeslot).toHaveTextContent(/Sat 2nd Dec 2023/);
		expect(nextAvailableTimeslot).toHaveTextContent(/07:00 - 10:00/);
	});

	it('renders next user booking widget', async () => {
		const nextUserBooking = screen.getByTestId('next-user-booking');
		expect(nextUserBooking).toBeInTheDocument();
		expect(nextUserBooking).toHaveTextContent(/Din nästa bokning är om 17 timmar 26 minuter/);
	});

	it('renders upcoming user bookings widget', async () => {
		const upcomingUserBookings = screen.getByTestId('upcoming-user-bookings');
		expect(upcomingUserBookings).toBeInTheDocument();
		expect(upcomingUserBookings).toHaveTextContent(/Dina kommande bokningar/);
		expect(upcomingUserBookings).toHaveTextContent(/Sun 31st Dec 2023/);
		expect(upcomingUserBookings).toHaveTextContent(/07:00 - 10:00/);
	});

	it('clicking next available timeslot widget navigates to calendar', async () => {
		const user = userEvent.setup()

		const nextAvailableTimeslotBtn = screen.getByTestId('next-available-timeslot-btn');
		expect(nextAvailableTimeslotBtn).toBeInTheDocument();
		await user.click(nextAvailableTimeslotBtn);
		expect(history.push).toHaveBeenCalledTimes(1);
		expect(history.location.pathname).toBe('/656b75c56c0a78cef01c9cf0/calendar/2023/12/02');
	});

	it('clicking first booking in upcoming user bookings widget navigates to calendar', async () => {
		const user = userEvent.setup()

		const upcomingUserBookingsBtn = screen.getByTestId('upcoming-user-bookings-btn');
		expect(upcomingUserBookingsBtn).toBeInTheDocument();
		await user.click(upcomingUserBookingsBtn);
		expect(history.push).toHaveBeenCalledTimes(1);
		expect(history.location.pathname).toBe('/656b75c56c0a78cef01c9cf0/calendar/2023/12/02');
	});
});