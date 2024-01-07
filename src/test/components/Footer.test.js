import React from 'react';
import {
	render,
	screen,
  cleanup,
} from '@testing-library/react'
import Footer from '../../components/Footer'
import { Router } from 'react-router-dom';
import history from '../../history';
import '@testing-library/jest-dom';

jest.spyOn(history, "push");

describe('Footer', () => {
    beforeEach(() => {

        render(
            <Router history={history}>
							<Footer />
            </Router>
        )
    })
    
    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('renders Footer view', () => {
			expect(screen.getByText('© 2023 Kimestry')).toBeDefined();
			
    });
});