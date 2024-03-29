import React from 'react';
import history from '../history';
import moment from 'moment';
// moment.tz.setDefault('Europe/Stockholm');


const UpcomingUserBookings = ({ selectedService, user, userBookings }) => {
    if (!userBookings) return null;
    
    const onBookingClick = url => {
        history.push(url);
      }
    const sortedUserBookings = userBookings?.sort((a, b) => moment(a.date).diff(moment(b.date)))

    const renderDate = date => {
        const updatedDate = moment(date);
        return updatedDate.format("ddd Do MMM YYYY");
    }
    
    const renderTimeslots = ({ timeslots = [], alternateTimeslots = [] }) => {
        const slots = [...timeslots, ...alternateTimeslots];
        const renderTimeslot = ({ start, end }) => {
            const rStart = moment.utc(start).format('HH:mm');
            const rEnd = moment.utc(end).format('HH:mm');
            return `${rStart} - ${rEnd}`
          }
        return slots?.map((timeslot, i) => timeslot.userid === user._id ?
        (
            <div key={i} className="">
                <div key={timeslot.id} className="">
                <i className="check icon"></i>
                {renderTimeslot(timeslot)}
                </div>
            </div>
        ) : null
    )}
    
    return (
        <ul>
            {
                sortedUserBookings.map((booking) => {
                    if(!moment(booking.date).isAfter(moment().startOf('day'))) return null;
                    const timeslots = renderTimeslots(booking);
                    return Boolean(timeslots.find(value => value !== null)) ? (
                        <li data-testid="upcoming-user-bookings-btn" key={booking._id} className="user-bookings">
                            <div className="user-booking" onClick={() => onBookingClick(`/${selectedService.id}/calendar/${moment(booking.date).format('YYYY')}/${moment(booking.date).format('MM')}/${moment(booking.date).format('DD')}`)}>
                                <i className="large calendar check centered outline icon"></i>
                                <div className="user-booking-date" >{renderDate(booking.date)}</div>
                                <div className="user-booking-timesloth">{timeslots}</div>
                            </div>
                        </li>
                    ) : null;
            
            })
        }
      </ul>)
}

export default UpcomingUserBookings;