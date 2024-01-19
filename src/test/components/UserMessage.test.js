import React from 'react';
import {
	render,
	screen,
  cleanup,
} from '@testing-library/react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import UserMessage from '../../components/UserMessage'
import { Router } from 'react-router-dom';
import history from '../../history';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';


const mockStore = configureStore([]);
const store = mockStore({
    userMessage: {
        message: {
            type: 'success',
            description: 'Nu har du tillgång till kalenderbokning.',
        }
	},
})

store.dispatch = jest.fn();

describe('UserMessage success', () => {
    beforeEach(() => {
			render(
				<Provider store={
						mockStore({
							userMessage: {
								message: {
										type: 'success',
										description: 'Nu har du tillgång till kalenderbokning.',
								}
							},
						})
				}>
						<Router history={history}>
								<UserMessage />
						</Router>
				</Provider>
			)
    })
    
    afterEach(() => {
        cleanup();
    });

    it('renders success user message', async () => {
			const userMessageContainer = screen.getByTestId('user-message-container');
			expect(userMessageContainer).toBeInTheDocument();
			expect(userMessageContainer).toHaveClass('message-container message-container-show');
			const userMessage = screen.getByTestId('user-message');
			expect(userMessage).toBeInTheDocument();
			expect(userMessage).toHaveClass('message message--success');
			const userMessageIcon = screen.getByTestId('user-message-icon');
			expect(userMessageIcon).toBeInTheDocument();
			expect(userMessageIcon).toHaveClass('large icon check circle');
			expect(userMessage).toHaveTextContent('Nu har du tillgång till kalenderbokning.');
    });
});

describe('UserMessage info', () => {
	beforeEach(() => {
		render(
			<Provider store={
					mockStore({
						userMessage: {
							message: {
									type: 'info',
									description: 'Du hittar alla dina kommande bokningar under mina bokningar.',
							}
						},
					})
			}>
					<Router history={history}>
							<UserMessage />
					</Router>
			</Provider>
		)
	})
	
	afterEach(() => {
			cleanup();
	});

	it('renders info user message', async () => {
		const userMessageContainer = screen.getByTestId('user-message-container');
		expect(userMessageContainer).toBeInTheDocument();
		expect(userMessageContainer).toHaveClass('message-container message-container-show');
		const userMessage = screen.getByTestId('user-message');
		expect(userMessage).toBeInTheDocument();
		expect(userMessage).toHaveClass('message message');
		const userMessageIcon = screen.getByTestId('user-message-icon');
		expect(userMessageIcon).toBeInTheDocument();
		expect(userMessageIcon).toHaveClass('info circle large icon');
		expect(userMessage).toHaveTextContent('Du hittar alla dina kommande bokningar under mina bokningar.');
	});
});

describe('UserMessage warning', () => {
	beforeEach(() => {
		render(
			<Provider store={
				mockStore({
					userMessage: {
						message: {
							type: 'alert',
							description: 'Du måste vara inloggad för att boka.',
						}
					},
				})
			}>
				<Router history={history}>
					<UserMessage />
				</Router>
			</Provider>
		)
	})
	
	afterEach(() => {
		cleanup();
	});

	it('renders info user message', async () => {
		const userMessageContainer = screen.getByTestId('user-message-container');
		expect(userMessageContainer).toBeInTheDocument();
		expect(userMessageContainer).toHaveClass('message-container message-container-show');
		const userMessage = screen.getByTestId('user-message');
		expect(userMessage).toBeInTheDocument();
		expect(userMessage).toHaveClass('message message--warning');
		const userMessageIcon = screen.getByTestId('user-message-icon');
		expect(userMessageIcon).toBeInTheDocument();
		expect(userMessageIcon).toHaveClass('warning sign large icon');
		expect(userMessage).toHaveTextContent('Du måste vara inloggad för att boka.');
	});
});

describe('UserMessage error', () => {
	beforeEach(() => {
		render(
			<Provider store={
					mockStore({
						userMessage: {
							message: {
									type: 'error',
									description: 'Fel användarnamn eller lösenord.',
							}
						},
					})
			}>
					<Router history={history}>
							<UserMessage />
					</Router>
			</Provider>
		)
	})
	
	afterEach(() => {
			cleanup();
	});

	it('renders info user message', async () => {
		const userMessageContainer = screen.getByTestId('user-message-container');
		expect(userMessageContainer).toBeInTheDocument();
		expect(userMessageContainer).toHaveClass('message-container message-container-show');
		const userMessage = screen.getByTestId('user-message');
		expect(userMessage).toBeInTheDocument();
		expect(userMessage).toHaveClass('message message--error');
		const userMessageIcon = screen.getByTestId('user-message-icon');
		expect(userMessageIcon).toBeInTheDocument();
		expect(userMessageIcon).toHaveClass('warning sign large icon');
		expect(userMessage).toHaveTextContent('Fel användarnamn eller lösenord.');
	});
});

describe('UserMessage no message', () => {
	beforeEach(() => {
		render(
			<Provider store={
				mockStore({
					userMessage: {
						message: null
					},
				})
			}>
				<Router history={history}>
					<UserMessage />
				</Router>
			</Provider>
		)
	})
	
	afterEach(() => {
		cleanup();
	});

	it('renders info user message', async () => {
		const userMessageContainer = screen.getByTestId('user-message-container');
		expect(userMessageContainer).toBeInTheDocument();
		expect(userMessageContainer).toHaveClass('message-container message-container-hide');
	});
});

describe('UserMessage success', () => {
	beforeEach(() => {
		jest.useFakeTimers(); // Mock the timers

		render(
			<Provider store={store}>
				<Router history={history}>
					<UserMessage />
				</Router>
			</Provider>
		);
	});

	afterEach(() => {
		cleanup();
		jest.clearAllTimers();
	});

	it('renders the user message and closes it after timeout', async () => {
		const userMessageContainer = screen.getByTestId('user-message-container');
		expect(userMessageContainer).toBeInTheDocument();
		expect(userMessageContainer).toHaveClass('message-container message-container-show');
		act(() => {
			jest.advanceTimersByTime(3000); // Advance the timers by 3 seconds (adjust as needed)
		});

		expect(userMessageContainer).toHaveClass('message-container message-container-hide');
	});
});
