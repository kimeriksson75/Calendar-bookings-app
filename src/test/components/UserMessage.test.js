import React from 'react';
import {
	render,
	screen,
  cleanup,
	waitFor,
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
	application: {
		layout: 'dark',
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
							application: {
								layout: 'light',
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
			const userMessage = await screen.findByRole('alert');
			expect(userMessage).toBeInTheDocument();
			expect(userMessage).toHaveClass('Toastify__toast-body');
			expect(userMessage).toHaveTextContent('Nu har du tillgång till kalenderbokning.');
			
			const parentElement = userMessage.parentElement;
			expect(parentElement).toBeInTheDocument();
			expect(parentElement).toHaveClass('Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify--animate Toastify__bounce-enter--bottom-center');
			
			const userMessageIcon = screen.getByTestId('user-message-icon');
			expect(userMessageIcon).toBeInTheDocument();
			expect(userMessageIcon).toHaveClass('large icon check circle');
			const closeButton = screen.getByRole('button', { name: /close/ });
			expect(closeButton).toBeInTheDocument();
			expect(closeButton).toHaveClass('Toastify__close-button Toastify__close-button--light');
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
						application: {
							layout: 'light',
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
		
		const userMessage = await screen.findByRole('alert');
		expect(userMessage).toBeInTheDocument();
		expect(userMessage).toHaveClass('Toastify__toast-body');
		expect(userMessage).toHaveTextContent('Du hittar alla dina kommande bokningar under mina bokningar.');
		
		const parentElement = userMessage.parentElement;
		expect(parentElement).toBeInTheDocument();
		expect(parentElement).toHaveClass('Toastify__toast Toastify__toast-theme--light Toastify__toast--info Toastify--animate Toastify__bounce-enter--bottom-center');
		const userMessageIcon = screen.getByTestId('user-message-icon');
		expect(userMessageIcon).toBeInTheDocument();
		expect(userMessageIcon).toHaveClass('info circle large icon');
		
	});
});

describe('UserMessage warning', () => {
	beforeEach(() => {
		render(
			<Provider store={
				mockStore({
					userMessage: {
						message: {
							type: 'warning',
							description: 'Du måste vara inloggad för att boka.',
						}
					},
					application: {
						layout: 'light',
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
		
		const userMessage = await screen.findByRole('alert');
		expect(userMessage).toBeInTheDocument();
		expect(userMessage).toHaveClass('Toastify__toast-body');
		expect(userMessage).toHaveTextContent('Du måste vara inloggad för att boka.');
		
		const parentElement = userMessage.parentElement;
		expect(parentElement).toBeInTheDocument();
		expect(parentElement).toHaveClass('Toastify__toast Toastify__toast-theme--light Toastify__toast--warning Toastify--animate Toastify__bounce-enter--bottom-center');
		
		const userMessageIcon = screen.getByTestId('user-message-icon');
		expect(userMessageIcon).toBeInTheDocument();
		expect(userMessageIcon).toHaveClass('warning sign large icon');
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
						application: {
							layout: 'dark',
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
		
		const userMessage = await screen.findByRole('alert');
		expect(userMessage).toBeInTheDocument();
		expect(userMessage).toHaveClass('Toastify__toast-body');
		expect(userMessage).toHaveTextContent('Fel användarnamn eller lösenord.');
		
		const parentElement = userMessage.parentElement;
		expect(parentElement).toBeInTheDocument();
		expect(parentElement).toHaveClass('Toastify__toast Toastify__toast-theme--dark Toastify__toast--error Toastify--animate Toastify__bounce-enter--bottom-center');
		
		const userMessageIcon = screen.getByTestId('user-message-icon');
		expect(userMessageIcon).toBeInTheDocument();
		expect(userMessageIcon).toHaveClass('warning sign large icon');
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
					application: {
						layout: 'dark',
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
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});
});

describe.skip('UserMessage closes after preset timeout', () => {
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
		const userMessage = await screen.findByRole('alert');
		expect(userMessage).toBeInTheDocument();
		act(() => {
			jest.advanceTimersByTime(4000); // Advance the timers by 3 seconds (adjust as needed)
		});
		// wait for toast to close
		await waitFor(() => {
			const closedUserMessage = screen.queryByRole('alert');
			expect(closedUserMessage).not.toBeInTheDocument();
		});
	});
});
