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
import CreateUser from '../../views/CreateUser'
import { Router } from 'react-router-dom';
import history from '../../history';

const loginSpy = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({})

store.dispatch = jest.fn();

describe('CreateUser', () => {
    beforeEach(() => {
        const props = {
            match: {
                params: '65429601add7c81260092af3',
            },
        };
        render(
            <Provider store={store}>
                <Router history={history}>
                    <CreateUser {...props} />
                </Router>
            </Provider>
        )
    })
    
    afterEach(cleanup)
    it('renders CreateUser view', () => {
        const form = screen.getByTestId('create-user-form');
        expect(form).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Ny användare/ })).toBeDefined();
        expect(screen.getByLabelText(/Användarnamn:/)).toBeDefined();
        expect(screen.getByTestId(/username/)).toBeDefined();
        expect(screen.getByLabelText(/Email:/)).toBeDefined();
        expect(screen.getByTestId(/email/)).toBeDefined();
        expect(screen.getByLabelText(/Namn:/)).toBeDefined();
        expect(screen.getByTestId(/firstname/)).toBeDefined();
        expect(screen.getByLabelText(/Efternamn:/)).toBeDefined();
        expect(screen.getByTestId(/lastname/)).toBeDefined();
        expect(screen.getByLabelText(/Lösenord:/)).toBeDefined();
        expect(screen.getByTestId(/password/)).toBeDefined();
        expect(screen.getByLabelText(/Upprepa lösenord:/)).toBeDefined();
        expect(screen.getByTestId(/repeat/)).toBeDefined();
        
        const submitButton = screen.getByTestId(/btn-submit/);
        expect(submitButton).toBeInTheDocument();
        const clearFormButton = screen.getByTestId(/btn-clear/);
        expect(clearFormButton).toBeInTheDocument();
        expect(submitButton.getAttribute('disabled')).toBeDefined();
    });
    it('should disable submit if form is invalid', async () => {
        const user = userEvent.setup()

        const submitButton = screen.getByTestId(/btn-submit/);
        expect(submitButton).toBeInTheDocument();
        expect(submitButton.getAttribute('disabled')).toBeDefined();
        await user.type(screen.getByTestId(/username/), 'johndoe');
        await user.type(screen.getByTestId(/email/), 'johndoe@mail.com');
        await user.type(screen.getByTestId(/firstname/), 'John');
        await user.type(screen.getByTestId(/lastname/), 'Doe');
        await user.type(screen.getByTestId(/password/), '1234');
        await user.type(screen.getByTestId(/repeat/), '5678');
        expect(submitButton.getAttribute('disabled')).toBeNull();
    });
    
    it('clears form values', async () => {
        const user = userEvent.setup()

        const clearButton = screen.getByTestId(/btn-clear/);
        expect(clearButton).toBeInTheDocument();
        await user.type(screen.getByTestId(/username/), 'johndoe');
        await user.type(screen.getByTestId(/email/), 'johndoe@mail.com');
        await user.type(screen.getByTestId(/firstname/), 'John');
        await user.type(screen.getByTestId(/lastname/), 'Doe');
        await user.type(screen.getByTestId(/password/), '1234');
        await user.type(screen.getByTestId(/repeat/), '1234');
        expect(screen.getByTestId(/username/)).toHaveValue('johndoe');
        expect(screen.getByTestId(/email/)).toHaveValue('johndoe@mail.com');
        expect(screen.getByTestId(/firstname/)).toHaveValue('John');
        expect(screen.getByTestId(/lastname/)).toHaveValue('Doe');
        expect(screen.getByTestId(/password/)).toHaveValue('1234');
        expect(screen.getByTestId(/repeat/)).toHaveValue('1234');
        await user.click(clearButton);
        expect(screen.getByTestId(/username/)).toHaveValue('');
        expect(screen.getByTestId(/email/)).toHaveValue('');
        expect(screen.getByTestId(/firstname/)).toHaveValue('');
        expect(screen.getByTestId(/lastname/)).toHaveValue('');
        expect(screen.getByTestId(/password/)).toHaveValue('');
        expect(screen.getByTestId(/repeat/)).toHaveValue('');
    });
    
    it('should submit if form is validated', async () => {
        const user = userEvent.setup()

        const submitButton = screen.getByTestId(/btn-submit/);
        expect(submitButton).toBeInTheDocument();
        expect(submitButton.getAttribute('disabled')).toBeDefined();
        await user.type(screen.getByTestId(/username/), 'johndoe');
        await user.type(screen.getByTestId(/email/), 'johndoe@mail.com');
        await user.type(screen.getByTestId(/firstname/), 'John');
        await user.type(screen.getByTestId(/lastname/), 'Doe');
        await user.type(screen.getByTestId(/password/), '1234');
        await user.type(screen.getByTestId(/repeat/), '1234');
        expect(submitButton.getAttribute('disabled')).toBeNull();
        await user.click(submitButton);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
