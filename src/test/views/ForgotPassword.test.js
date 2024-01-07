import React from 'react';
import {
	render,
	screen,
  cleanup,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import ForgotPassword from '../../views/ForgotPassword'
import { Router } from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);

const forgotPasswordSpy = jest.fn();
const store = mockStore({
    auth: {
        isSignedIn: false,
        fetching: false,
        user: null
    }
})

store.dispatch = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    render(
        <Provider store={store}>
          <Router history={history}>
            <ForgotPassword />
          </Router>
        </Provider>
    )
  })

  afterEach(cleanup)
  it('renders forgot password view', () => {
    const form = screen.getByTestId('forgot-password-form');
    expect(form).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Glömt lösenord/ })).toBeDefined();
    expect(screen.getByLabelText(/Email:/)).toBeDefined();
    expect(screen.getByRole('textbox', { id: /email/ })).toBeDefined();
    
    const submitButton = screen.getByRole('button', { name: /Skicka/ });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.getAttribute('disabled')).toBeDefined();

    const clearButton = screen.getByRole('button', { name: /Rensa/ });
    expect(clearButton).toBeInTheDocument();
    
    const loginLink = screen.getByRole('link', { name: /Tillbaka till login/ });
    expect(loginLink.getAttribute('href')).toBe('/user/login');
    
    const newUserLink = screen.getByRole('link', { name: /Ny användare/ });
    expect(newUserLink.getAttribute('href')).toBe('/user/create');
  });

  it('validates email', async () => {
    const user = userEvent.setup()
    const email = screen.getByTestId('email');
    const loginButton = screen.getByTestId('btn-submit')
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveProperty('disabled', true);
    await user.type(email, 'johndoe@mail');

    expect(loginButton).toHaveProperty('disabled', false);

    await user.click(loginButton);
    expect(screen.getByText(/Email måste vara en giltig email/)).toBeDefined();
  });

  it('clears form values', async () => {
    const user = userEvent.setup()

    const email = screen.getByTestId('email');
    const clearButton = screen.getByTestId('btn-clear')
    expect(clearButton).toBeInTheDocument();

    expect(email.value).toBe('');
    await user.type(email, 'johndoe@email.com');

    expect(email.value).toBe('johndoe@email.com')

    await user.click(clearButton);
    expect(email.value).toBe('')
  });

  it('submits login form values', async () => {
    const user = userEvent.setup()
    const email = screen.getByTestId('email');
    const submitButton = screen.getByTestId('btn-submit')
    expect(submitButton).toBeInTheDocument();
    const clearButton = screen.getByTestId('btn-clear')
    expect(clearButton).toBeInTheDocument();

    expect(submitButton.getAttribute('disabled')).toBeDefined();

    expect(email.value).toBe('');
    await user.type(email, 'johndoe@email.com');

    expect(email.value).toBe('johndoe@email.com')

    await user.click(submitButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});