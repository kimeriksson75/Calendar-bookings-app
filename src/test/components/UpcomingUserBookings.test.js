import React from 'react';
import { render, screen } from '@testing-library/react';
import UpcomingUserBookings from '../../components/UpcomingUserBookings';
import '@testing-library/jest-dom';
import 'setimmediate';

describe('UpcomingUserBookings', () => {
    const selectedService = 'Service 1';
    const user = { _id: '123', name: 'John Doe' };
    const userBookings = [
        {
            _id: '1',
            date: '2022-01-01',
            timeslots: [
                { _id: '1', start: '2022-01-01T09:00:00Z', end: '2022-01-01T10:00:00Z', userid: '123', username: 'Doe' },
                { _id: '2', start: '2022-01-01T10:00:00Z', end: '2022-01-01T11:00:00Z', userid: '456', username: 'Nelson' },
            ],
            alternateTimeslots: [],
        },
        {
            _id: '2',
            date: '2022-01-02',
            timeslots: [
                { _id: '3', start: '2022-01-02T09:00:00Z', end: '2022-01-02T10:00:00Z', userid: '123', username: 'Doe' },
                { _id: '4', start: '2022-01-02T10:00:00Z', end: '2022-01-02T11:00:00Z', userid: '789', username: 'Nelson' },
            ],
            alternateTimeslots: [],
        },
    ];

    it('should render upcoming user bookings', () => {
        Date.now = jest.fn().mockReturnValue(new Date('2021-12-31T12:33:37.000Z'));

        render(<UpcomingUserBookings selectedService={selectedService} user={user} userBookings={userBookings} />);
        const upcomingUserBooking = screen.getAllByTestId('upcoming-user-bookings-btn');
        expect(upcomingUserBooking).toHaveLength(2);
        expect(upcomingUserBooking[0]).toHaveTextContent('Sat 1st Jan 2022');
        expect(upcomingUserBooking[0]).toHaveTextContent('09:00 - 10:00');
        expect(upcomingUserBooking[1]).toHaveTextContent('Sun 2nd Jan 2022');
        expect(upcomingUserBooking[1]).toHaveTextContent('09:00 - 10:00');
		});
	
		it('it should only render upcoming user bookings', () => {
			Date.now = jest.fn().mockReturnValue(new Date('2022-01-01T12:33:37.000Z'));

			render(<UpcomingUserBookings selectedService={selectedService} user={user} userBookings={userBookings} />);
			const upcomingUserBooking = screen.getAllByTestId('upcoming-user-bookings-btn');
			expect(upcomingUserBooking).toHaveLength(1);
			expect(upcomingUserBooking[0]).toHaveTextContent('Sun 2nd Jan 2022');
			expect(upcomingUserBooking[0]).toHaveTextContent('09:00 - 10:00');
		});
	
		it('it should not render passed date user bookings', () => {
			Date.now = jest.fn().mockReturnValue(new Date('2022-01-02T12:33:37.000Z'));

			render(<UpcomingUserBookings selectedService={selectedService} user={user} userBookings={userBookings} />);
			const upcomingUserBooking = screen.queryAllByTestId('upcoming-user-bookings-btn');
			expect(upcomingUserBooking).toHaveLength(0);
		});
	
		it('should not render user bookings when userBookings is null', () => {
			render(<UpcomingUserBookings selectedService={selectedService} user={user} userBookings={null} />);
			const upcomingUserBooking = screen.queryAllByTestId('upcoming-user-bookings-btn');
			expect(upcomingUserBooking).toHaveLength(0);
		});
});