import React from 'react';
import {
	render,
	screen,
  cleanup,
} from '@testing-library/react'
import Logout from '../../views/Logout'
import { Router } from 'react-router-dom';
import history from '../../history';
import '@testing-library/jest-dom';

jest.spyOn(history, "push");

describe('Logout', () => {
    beforeEach(() => {

        render(
            <Router history={history}>
							<Logout />
            </Router>
        )
    })
    
    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('renders Logout view', () => {
			expect(screen.getByRole('heading', { name: /Du är nu utloggad/ })).toBeDefined();
			const loginBtn = screen.getByRole('link', { name: /Logga in/ });
			expect(loginBtn).toBeInTheDocument();
			expect(loginBtn.getAttribute('href')).toBe('/user/login');
			const createUserBtn = screen.getByRole('link', { name: /Ny användare/ });
			expect(createUserBtn).toBeInTheDocument();
			expect(createUserBtn.getAttribute('href')).toBe('/user/create');
    });
});