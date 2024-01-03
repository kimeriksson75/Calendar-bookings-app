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
import Login from '../../views/Login'
import * as userActions from'../../actions/userActions';
import { Router } from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);

const loginSpy = jest.fn();
const store = mockStore({
    auth: {
        isSignedIn: false,
        fetching: false,
        user: null
    }
})

store.dispatch = jest.fn();

// window.document.getSelection = jest.fn(() => {
//   return {
//     removeAllRanges: jest.fn(),
//     addRange: jest.fn(),
//   };
// });


describe('Login', () => {
  beforeEach(() => {
    render(
        <Provider store={store}>
          <Router history={history}>
            <Login />
          </Router>
        </Provider>
    )
  })

  afterEach(cleanup)
  it('renders login view', () => {
    const form = screen.getByTestId('login-form');
    expect(form).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Login/ })).toBeDefined();
    expect(screen.getByLabelText(/Användarnamn:/)).toBeDefined();
    expect(screen.getByRole('textbox', { id: /username/ })).toBeDefined();
    expect(screen.getByLabelText(/Lösenord:/)).toBeDefined();
    expect(screen.getByRole('textbox', { id: /password/ })).toBeDefined();
    expect(screen.getByRole('button', { name: /Logga in/ })).toBeDefined();
    
    const loginButton = screen.getByRole('button', { name: /Logga in/ });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.getAttribute('disabled')).toBeDefined();

    const clearButton = screen.getByRole('button', { name: /Rensa/ });
    expect(clearButton).toBeInTheDocument();
    
    const forgotPasswordLink = screen.getByRole('link', { name: /Glömt lösenord?/ });
    expect(forgotPasswordLink.getAttribute('href')).toBe('/user/forgot-password');
    
    const newUserLink = screen.getByRole('link', { name: /Ny användare/ });
    expect(newUserLink.getAttribute('href')).toBe('/user/create');
  });

  it('validates username and password', async () => {
    const user = userEvent.setup()
    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');
    const loginButton = screen.getByTestId('btn-login')
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveProperty('disabled', true);
    await user.type(username, 'Jo');
    await user.type(password, 'pa');

    expect(loginButton).toHaveProperty('disabled', false);

    await user.click(loginButton);
    expect(screen.getByText(/Användarnamn måste vara minst 3 tecken./)).toBeDefined();
    expect(screen.getByText(/Lösenord måste vara minst 3 tecken./)).toBeDefined();
  });

  it('clears form values', async () => {
    const user = userEvent.setup()

    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');
    const clearButton = screen.getByTestId('btn-clear')
    expect(clearButton).toBeInTheDocument();

    expect(username.value).toBe('');
    expect(password.value).toBe('');
    await user.type(username, 'JohnDoe');
    await user.type(password, 'password');

    expect(username.value).toBe('JohnDoe')
    expect(password.value).toBe('password')

    await user.click(clearButton);
    expect(username.value).toBe('')
    expect(password.value).toBe('')
  });

  it('submits login form values', async () => {
    const user = userEvent.setup()
    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');
    const loginButton = screen.getByTestId('btn-login')
    expect(loginButton).toBeInTheDocument();
    const clearButton = screen.getByTestId('btn-clear')
    expect(clearButton).toBeInTheDocument();

    expect(loginButton.getAttribute('disabled')).toBeDefined();

    expect(username.value).toBe('');
    expect(password.value).toBe('');
    await user.type(username, 'JohnDoe');
    await user.type(password, 'password');

    expect(username.value).toBe('JohnDoe')
    expect(password.value).toBe('password')

    await user.click(loginButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});