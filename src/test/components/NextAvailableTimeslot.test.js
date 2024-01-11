import React from 'react';
import { render, screen } from '@testing-library/react';
import NextAvailableTimeslot from '../../components/NextAvailableTimeslot';
import '@testing-library/jest-dom';
Date.now = jest.fn().mockReturnValue(new Date('2022-01-01T12:33:37.000Z'));

describe('NextAvailableTimeslot', () => {
  const bookings = [
    {
      date: '2022-01-01',
      timeslots: [
        { start: '2022-01-01T09:00:00Z', end: '2022-01-01T10:00:00Z', userid: null },
        { start: '2022-01-01T10:00:00Z', end: '2022-01-01T11:00:00Z', userid: '123' },
      ],
      alternateTimeslots: [],
    },
    {
      date: '2022-01-02',
      timeslots: [
        { start: '2022-01-02T09:00:00Z', end: '2022-01-02T10:00:00Z', userid: null },
        { start: '2022-01-02T10:00:00Z', end: '2022-01-02T11:00:00Z', userid: null },
      ],
      alternateTimeslots: [],
    },
  ];

  const selectedService = {
    timeslots: [
      { start: '2022-01-01T09:00:00Z', end: '2022-01-01T10:00:00Z' },
      { start: '2022-01-01T10:00:00Z', end: '2022-01-01T11:00:00Z' },
    ],
    alternateTimeslots: [],
  };

  it('renders the next available timeslot for selected service', () => {
    render(<NextAvailableTimeslot bookings={bookings} selectedService={selectedService} />);
    const nextAvailableTimeslotBtn = screen.getByTestId('next-available-timeslot-btn');
      expect(nextAvailableTimeslotBtn).toBeDefined();
      expect(nextAvailableTimeslotBtn).toHaveTextContent('Sun 2nd Jan 2022');
      expect(nextAvailableTimeslotBtn).toHaveTextContent('09:00 - 10:00');
  });

  it('should render next available timeslot when there is no current empty bookings', () => {
    const emptyBookings = [
      {
        date: '2022-01-01',
        timeslots: [
          { start: '2022-01-01T09:00:00Z', end: '2022-01-01T10:00:00Z', userid: '123' },
          { start: '2022-01-01T10:00:00Z', end: '2022-01-01T11:00:00Z', userid: '456' },
        ],
				alternateTimeslots: [
					{ start: '2022-01-01T09:00:00Z', end: '2022-01-01T10:00:00Z', userid: '123' },
					{ start: '2022-01-01T10:00:00Z', end: '2022-01-01T11:00:00Z', userid: '456' },
        ],
      },
      {
        date: '2022-01-02',
        timeslots: [
          { start: '2022-01-02T09:00:00Z', end: '2022-01-02T10:00:00Z', userid: '789' },
          { start: '2022-01-02T10:00:00Z', end: '2022-01-02T11:00:00Z', userid: '123' },
        ],
        alternateTimeslots: [
					{ start: '2022-02-01T09:00:00Z', end: '2022-01-01T10:00:00Z', userid: '123' },
					{ start: '2022-02-01T10:00:00Z', end: '2022-01-01T11:00:00Z', userid: '456' },
        ],
      },
    ];

    render(<NextAvailableTimeslot bookings={emptyBookings} selectedService={selectedService} />);
    const nextAvailableTimeslotBtn = screen.queryByTestId('next-available-timeslot-btn');
		expect(nextAvailableTimeslotBtn).toBeDefined();
		expect(nextAvailableTimeslotBtn).toHaveTextContent('Mon 3rd Jan 202209:00 - 10:00');
		expect(nextAvailableTimeslotBtn).toHaveTextContent('09:00 - 10:00');
  });
});