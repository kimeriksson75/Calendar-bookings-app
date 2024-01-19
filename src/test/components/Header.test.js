import React from 'react';
import {
	render,
	screen,
  cleanup,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import Header from '../../components/Header'
import { Router } from 'react-router-dom';
import history from '../../history';
import '@testing-library/jest-dom';

const state = {
	application: {
		layout: 'light',
		showSidebar: false,
	},
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
}
const mockStore = configureStore([]);
const store = mockStore({
	...state,
})

store.dispatch = jest.fn();
jest.spyOn(history, "push");
jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  moment.now = () => +new Date('2023-12-01T12:33:37.000Z');
  return moment;
});

Date.now = jest.fn().mockReturnValue(new Date('2023-12-01T12:33:37.000Z'));
describe('Header', () => {
	beforeEach(() => {

		render(
			<Provider store={store}>
				<Router history={history}>
					<Header />
				</Router>
			</Provider>
		)
	})
    
	afterEach(() => {
		cleanup();
	});
	beforeAll(() => {
		jest.clearAllMocks();
	})

	it('renders Header component', async () => {
		const navigation = screen.getByRole('navigation');
		expect(navigation).toBeInTheDocument();
		expect(navigation).toHaveClass('nav');

		const logo = screen.getByLabelText(/logo/)
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveClass('logo');
		
		expect(screen.getByRole('button', { name: /Hem/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Kalender/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Mina bokningar/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Logga ut John/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Ny användare/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Tema - Mörk/ })).toBeInTheDocument();
	});

	it('should navigate according to navigation', async () => {
		await userEvent.click(screen.getByRole('button', { name: /Hem/ }));
		expect(history.push).toHaveBeenCalledWith('/');
		await userEvent.click(screen.getByRole('button', { name: /Kalender/ }));
		expect(history.push).toHaveBeenCalledWith('/656b75c56c0a78cef01c9cf0/calendar/2023/12/1');
		await userEvent.click(screen.getByRole('button', { name: /Mina bokningar/ }));
		expect(history.push).toHaveBeenCalledWith('/656b75c56c0a78cef01c9cf0/bookings');
		await userEvent.click(screen.getByRole('button', { name: /Ny användare/ }));
		expect(history.push).toHaveBeenCalledWith('/user/create/65429601add7c81260092af3');
		await userEvent.click(screen.getByRole('button', { name: /Logga ut John/ }));
		expect(history.push).toHaveBeenCalledWith('/user/logout');
	});
})

describe('Header dark layout', () => {
	beforeEach(() => {
		const store = mockStore({
			...state,
			application: {
				layout: 'dark',
				showSidebar: false,
			},
		})
		store.dispatch = jest.fn();
		render(
			<Provider store={store}>
				<Router history={history}>
					<Header />
				</Router>
			</Provider>
		)
	});
	afterEach(() => {
		cleanup();
	});
	beforeAll(() => {
		jest.clearAllMocks();
	})
	it('renders Header component with dark layout', async () => {
		const navigation = screen.getByRole('navigation');
		expect(navigation).toBeInTheDocument();
		const body = document.querySelector('body');
		expect(body).toHaveClass('dark');
		expect(screen.getByRole('button', { name: /Tema - Ljus/ })).toBeInTheDocument();
	});
});

describe('Header toggle layout', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<Header />
				</Router>
			</Provider>
		)
	});
	afterEach(() => {
		cleanup();
	});
	beforeAll(() => {
		jest.clearAllMocks();
	})
	it('should toggle layout from light to dark', async () => {
		await userEvent.click(screen.getByRole('button', { name: /Tema - Mörk/ }));
		expect(store.dispatch).toHaveBeenCalledWith({
			type: 'SET_LAYOUT',
			payload: 'dark'
		});		
	});
});
describe('Header toggle layout', () => {
	beforeEach(() => {
		const store = mockStore({
			...state,
			application: {
				layout: 'dark',
				showSidebar: false,
			},
		})
		store.dispatch = jest.fn();
		render(
			<Provider store={store}>
				<Router history={history}>
					<Header />
				</Router>
			</Provider>
		)
	});
	afterEach(() => {
		cleanup();
	});
	beforeAll(() => {
		jest.clearAllMocks();
	})
	
	it.skip('should toggle layout from dark to light', async () => {
		await userEvent.click(screen.getByRole('button', { name: /Tema - Ljus/ }));
		expect(store.dispatch).toHaveBeenCalledWith({
			type: 'SET_LAYOUT',
			payload: 'light'
		});		
	});
});