import React, { useEffect, useState } from 'react';
import moment from 'moment';
import history from '../history';
moment.tz.setDefault('Europe/Stockholm');

const NextAvailableTimeslot = ({ bookings = [], selectedService }) => {

    const { timeslots = [], alternateTimeslots = [] } = selectedService || {};
    const [availableTimeslot, setAvailableTimeslot] = useState(null);
    const [availableDate, setAvailableDate] = useState(null);

    const sortedBookings = bookings.sort((a, b) => moment(a.date).diff(moment(b.date)))
    const dateSpanStart = moment();
    const dateSpanEnd = moment().add(10, 'day');

    const onBookingClick = url => {
        history.push(url);
    }
    
    const renderDate = date => {
        const updatedDate = moment(date);
        return updatedDate.format("ddd Do MMM YYYY");
    }
    const renderTimeslot = ({ start, end }) => {
        const rStart = moment.utc(start).format('HH:mm');
        const rEnd = moment.utc(end).format('HH:mm');
        return `${rStart} - ${rEnd}`
      }

    const isWeekDay = (day) => {
        const dayOfWeek = moment.utc()
            .set({ date: day })
            .isoWeekday();
        return dayOfWeek !== 6 && dayOfWeek !== 7;
    }
    
    const isAlternateTimeslots = (day) => {
        const hasAlternateTimeslots = alternateTimeslots.length > 0;
        if (!hasAlternateTimeslots) {
            return true;
        }
        return isWeekDay(day);
    }
    
    useEffect(() => {
        for (dateSpanStart; dateSpanEnd.isAfter(dateSpanStart); dateSpanStart.add(1, 'day')) {
            const booking = sortedBookings.find(booking => moment.utc(booking.date).format('YYYY-MM-DD') === moment(dateSpanStart).format('YYYY-MM-DD')) || null;
            const issuedTimeslots = isAlternateTimeslots(moment.utc(dateSpanStart).format('D')) ?  timeslots : alternateTimeslots;
            const issuedTimeslot = issuedTimeslots.find(timeslot =>
                dateSpanStart.set({
                    hour: moment.utc(timeslot.start).format('HH'),
                    minute: moment.utc(timeslot.start).format('m')
                }).isAfter(moment())) || null;
            
            if (!booking && issuedTimeslot) {
                setAvailableTimeslot(issuedTimeslot);
                setAvailableDate(dateSpanStart)
                break;
            }
            if (booking) {
                const existingIssuedTimeslots = isAlternateTimeslots(moment(dateSpanStart).format('D')) ? booking.timeslots : booking.alternateTimeslots;
                const emptyTimeslot = existingIssuedTimeslots.find(timeslot =>
                    timeslot.userid === null && dateSpanStart
                        .set({
                            hour: moment(timeslot.start).format('HH'),
                            minute: moment(timeslot.start).format('m')
                        })
                    .isAfter(moment())) || null;
                if (emptyTimeslot) {
                    setAvailableTimeslot(emptyTimeslot)
                    setAvailableDate(dateSpanStart)
                    break;
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="next-available-booking">
            {availableTimeslot ? (
                <div className="next-available-booking__title">
                    <h3>Nästa tillgängliga bokning</h3>
                    <div className="calendar-day-bookings-animate calendar-day-bookings--vacant calendar-day-bookings--next-available" onClick={() => onBookingClick(`/${selectedService.id}/calendar/${moment(availableDate).format('YYYY')}/${moment(availableDate).format('MM')}/${moment(availableDate).format('DD')}`)}>
                        <i className="large calendar centered outline icon"></i>
                        <div className="calendar-day-bookings__content__user" >{renderDate(availableDate)}</div>
                        <div className="calendar-day-bookings__content__timeslot">{renderTimeslot(availableTimeslot)}</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default NextAvailableTimeslot;