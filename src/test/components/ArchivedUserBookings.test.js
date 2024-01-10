import React from 'react';
import { render, screen } from '@testing-library/react';
import ArchivedUserBookings from '../../components/ArchivedUserBookings';
import '@testing-library/jest-dom';
import 'setimmediate';


describe('ArchivedUserBookings', () => {
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

	it('should render passed date user bookings', () => {
		Date.now = jest.fn().mockReturnValue(new Date('2022-01-02T12:33:37.000Z'));

    render(<ArchivedUserBookings selectedService={selectedService} user={user} userBookings={userBookings} />);
		const archivedUserBooking = screen.getAllByTestId('archived-user-booking');
		expect(archivedUserBooking).toHaveLength(2);
		expect(archivedUserBooking[0]).toHaveTextContent('Sat 1st Jan 2022');
		expect(archivedUserBooking[0]).toHaveTextContent('09:00 - 10:00');
		expect(archivedUserBooking[1]).toHaveTextContent('Sun 2nd Jan 2022');
		expect(archivedUserBooking[1]).toHaveTextContent('09:00 - 10:00');
  });

	it('it should only render passed date user bookings', () => {
		Date.now = jest.fn().mockReturnValue(new Date('2022-01-01T12:33:37.000Z'));

    render(<ArchivedUserBookings selectedService={selectedService} user={user} userBookings={userBookings} />);
		const archivedUserBooking = screen.getAllByTestId('archived-user-booking');
		expect(archivedUserBooking).toHaveLength(1);
		expect(archivedUserBooking[0]).toHaveTextContent('Sat 1st Jan 2022');
		expect(archivedUserBooking[0]).toHaveTextContent('09:00 - 10:00');
	});
	
	it('it should not render future date user bookings', () => {
		Date.now = jest.fn().mockReturnValue(new Date('2021-12-31T00:33:37.000Z'));

		render(<ArchivedUserBookings selectedService={selectedService} user={user} userBookings={userBookings} />);
		const archivedUserBooking = screen.queryAllByTestId('archived-user-booking');
		expect(archivedUserBooking).toHaveLength(0);
	});

	it('should not render user bookings when userBookings is null', () => {
		Date.now = jest.fn().mockReturnValue(new Date('2022-01-02T12:33:37.000Z'));

		render(<ArchivedUserBookings selectedService={selectedService} user={user} userBookings={null} />);
		const archivedUserBooking = screen.queryAllByTestId('archived-user-booking');
		expect(archivedUserBooking).toHaveLength(0);
	});
});