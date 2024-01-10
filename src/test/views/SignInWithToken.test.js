import React from 'react';
import {
	render,
	screen,
	cleanup,
} from '@testing-library/react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import SignInWithToken from '../../views/SignInWithToken'
import { Router } from 'react-router-dom';
import history from '../../history';
import '@testing-library/jest-dom';
import 'setimmediate';
import { getServicesByResidence, setSelectedService } from '../../actions/serviceActions';
import { signInWithToken } from '../../actions/userActions';
import { mockLocalStorage } from '../utils/mockLocalStorage';

const { removeItemMock } = mockLocalStorage();
const user = {
	_id: '658055edfaa7d604c938ec48',
	username: 'johndoe',
	email: 'johndoe@mail.com',
	firstname: 'John',
	lastname: 'Doe',
	residence: '65429601add7c81260092af3',
	roles: ['user'],
};
const service = {
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
	services: [{
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
	}],
};


jest.spyOn(history, "push");
jest.mock('../../actions/serviceActions')
jest.mock('../../actions/userActions')

describe('sign in with token get service by residence', () => {
	beforeEach(() => {
		const mockStore = configureStore([]);
		const store = mockStore({
			auth: {
				isSignedIn: false,
			},
			service: {
				services: [],
			}
		})
		store.dispatch = jest.fn();
		const props = {
			match: {
				params: {
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgwMWU2MTg2NzAxNWEzZWU1OTNmZDgiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwMjg5NTIwMSwiZXhwIjoxNzAyOTgxNjAxfQ.iotB-37jSaHAbO2DAx8DkaeW-5WR2m_b71dBpd_12t8',
					serviceId: '656b75c56c0a78cef01c9cf0',
					residenceId: '65429601add7c81260092af3',
				}
			}
		};
		render(
			<Provider store={store}>
				<Router history={history}>
					<SignInWithToken {...props} />
				</Router>
			</Provider>
		);
	});
	
	afterEach(() => {
		cleanup();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should call getServicesByResidence method', async () => {
		const residenceId = '65429601add7c81260092af3';
		removeItemMock.mockImplementation(() => null);
		expect(screen.getByText('Login with token')).toBeInTheDocument();
		
		expect(getServicesByResidence).toHaveBeenCalledTimes(1);
		expect(getServicesByResidence).toHaveBeenCalledWith(residenceId);
	});
})

describe('sign in with token signin', () => {
	beforeEach(() => {
		const mockStore = configureStore([]);
		const store = mockStore({
			auth: {
				isSignedIn: false,
			},
			service: {
				services: [{
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
				}],
			}
		})
		store.dispatch = jest.fn();
		const props = {
			match: {
				params: {
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgwMWU2MTg2NzAxNWEzZWU1OTNmZDgiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwMjg5NTIwMSwiZXhwIjoxNzAyOTgxNjAxfQ.iotB-37jSaHAbO2DAx8DkaeW-5WR2m_b71dBpd_12t8',
					serviceId: '656b75c56c0a78cef01c9cf0',
					residenceId: '65429601add7c81260092af3',
				}
			}
		};
		render(
			<Provider store={store}>
				<Router history={history}>
					<SignInWithToken {...props} />
				</Router>
			</Provider>
		);
	});

	it('should call setSelectedService and signInWithToken methods', async () => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgwMWU2MTg2NzAxNWEzZWU1OTNmZDgiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwMjg5NTIwMSwiZXhwIjoxNzAyOTgxNjAxfQ.iotB-37jSaHAbO2DAx8DkaeW-5WR2m_b71dBpd_12t8'
		removeItemMock.mockImplementationOnce(() => null);

		expect(screen.getByText('Login with token')).toBeInTheDocument();
		
		expect(setSelectedService).toHaveBeenCalledTimes(1);
		expect(setSelectedService).toHaveBeenCalledWith(service.selectedService);
		expect(removeItemMock).toHaveBeenCalledTimes(2);
		expect(removeItemMock).toHaveBeenCalledWith('user');
		expect(removeItemMock).toHaveBeenCalledWith('residence');
		expect(signInWithToken).toHaveBeenCalledTimes(1);
		expect(signInWithToken).toHaveBeenCalledWith(token);
	});
});

describe('sign in with token redirect', () => {
	beforeEach(() => {
		const mockStore = configureStore([]);
		const store = mockStore({
			auth: {
				isSignedIn: false,
				user: {
					_id: '658055edfaa7d604c938ec48',
					username: 'johndoe',
					email: 'johndoe@mail.com',
					firstname: 'John',
					lastname: 'Doe',
					residence: '65429601add7c81260092af3',
					roles: ['user'],
				}
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
				services: [{
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
				}],
			}
		})
		store.dispatch = jest.fn();
		const props = {
			match: {
				params: {
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgwMWU2MTg2NzAxNWEzZWU1OTNmZDgiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwMjg5NTIwMSwiZXhwIjoxNzAyOTgxNjAxfQ.iotB-37jSaHAbO2DAx8DkaeW-5WR2m_b71dBpd_12t8',
					serviceId: '656b75c56c0a78cef01c9cf0',
					residenceId: '65429601add7c81260092af3',
				}
			}
		};
		render(
			<Provider store={store}>
				<Router history={history}>
					<SignInWithToken {...props} />
				</Router>
			</Provider>
		);
	});

	it('should redirect to /', async () => {
		expect(screen.getByText('Login with token')).toBeInTheDocument();
		
		expect(history.push).toHaveBeenCalledTimes(1);
		expect(history.push).toHaveBeenCalledWith('/');
	});
});

	

