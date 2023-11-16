import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import moment from 'moment';
import { pipe, sortBy, filter } from 'lodash/fp';
import { getBookingByAuthor, newMessage } from '../actions';
import InfoBar from '../components/InfoBar';

const UserBookings = props => {
  const {
    auth: { user, isSignedIn },
    selectedService,
    bookingData: { userBookings },
    getBookingByAuthor,
    newMessage
  } = props;


  const sortedUserBookings = pipe([
    sortBy(booking => moment(booking.date)),
    filter(booking => moment(booking.date) >= moment().startOf('day'))
  ])(userBookings);

  useEffect(() => {
    if (user && selectedService) getBookingByAuthor(selectedService.id, user._id);
  }, [user, getBookingByAuthor, selectedService]);

  const onBookingClick = url => {
    history.push(url);
  }

  const renderDate = date => {
    const updatedDate = moment(date);
    return updatedDate.format("ddd Do MMM YYYY");
  }

  const renderTimeslots = timeslots =>
      timeslots.map((timeslot, i) => timeslot.userid === user._id ?
        (
          <div key={i} className="">
            <div key={timeslot.id} className="">
              <i className="check icon"></i>
              {timeslot.timeslot}
            </div>
          </div>) : null )

  const renderBookings = () =>
  (<div className="user-bookings-container">
    {
    sortedUserBookings.map((booking) => {
      const timeslots = booking?.timeslots ? renderTimeslots(booking.timeslots) : null;
      return Boolean(timeslots.find(value => value !== null)) ? (
        <div key={booking.id} className="user-bookings">
          <div key={booking.id + 1} className="user-booking" onClick={() => onBookingClick(`/${selectedService.id}/calendar/${moment(booking.date).format('YYYY')}/${moment(booking.date).format('MM')}/${moment(booking.date).format('DD')}`)}>
              <i className="large calendar check centered outline icon"></i>
              <div className="user-booking-date" >{renderDate(booking.date)}</div>
              <div className="user-booking-timesloth">{timeslots}</div>
          </div>
        </div>
      ) : null;
    
    })
  }
  </div>)

  const userErrorMessage = () => {
    newMessage({
      type: 'error',
      title: 'Dennay vy kräver inglogg.',
      description: 'Logga in och försök igen.'
    })
  }

  return (
    <div className="page-container">
      <InfoBar title="Mina kommande bokningar"/>
        {isSignedIn ?
          (<div>
            {userBookings && renderBookings()}
          </div>) : userErrorMessage()
        }
      </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
    selectedService: state.service.selectedService,
    bookingData: state.bookingData
  });
}
export default connect(mapStateToProps, { getBookingByAuthor, newMessage })(UserBookings);