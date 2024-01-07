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
import e from 'express';

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
