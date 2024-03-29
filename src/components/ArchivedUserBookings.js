import React from 'react';
import moment from 'moment';
// moment.tz.setDefault('Europe/Stockholm');


const ArchivedUserBookings = ({ selectedService, user, userBookings }) => {
    if(!userBookings) return null;
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
                    if(moment(booking.date).isAfter(moment())) return null;
                    const timeslots = renderTimeslots(booking);
                    return Boolean(timeslots.find(value => value !== null)) ? (
                        <li data-testid="archived-user-booking" key={booking._id} className="user-bookings">
                            <div key={booking.id + 1} className="user-booking user-booking-archived" disabled>
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

export default ArchivedUserBookings;