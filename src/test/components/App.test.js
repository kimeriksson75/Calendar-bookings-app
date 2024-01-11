import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import App from '../../components/App';
import { application } from 'express';
import UserMessage from '../../components/UserMessage';
import history from '../../history';
import '@testing-library/jest-dom';
jest.mock('../../styles/main.scss', () => '')

const mockStore = configureStore([]);
const store = mockStore({
    application: {
        showSidebar: false,
        showLoader: false,
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
    UserMessage: {},
});
store.dispatch = jest.fn();
jest.spyOn(history, "push");
jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  moment.now = () => +new Date('2023-12-01T12:33:37.000Z');
  return moment;
});

Date.now = jest.fn().mockReturnValue(new Date('2023-12-01T12:33:37.000Z'));
describe('App', () => {
  test('renders header, footer, user message, and loader', () => {
      render(
          <Provider store={store}>
              <Router history={history}>
                <Switch>
                    <App />
                </Switch>
              </Router>
            </Provider>
    );

    // Assert that the header component is rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();

    // Assert that the footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    // Assert that the user message component is rendered
    expect(screen.getByTestId('user-message')).toBeInTheDocument();

    // Assert that the loader component is rendered
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});