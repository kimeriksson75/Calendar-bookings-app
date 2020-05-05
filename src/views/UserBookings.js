import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getBookingByAuthor, newMessage } from '../actions';

const UserBookings = props => {
  const {
    auth,
    bookingData,
    getBookingByAuthor,
    newMessage
  } = props;

  const { user } = auth;
  const { userBookings } = bookingData;

  useEffect(() => {
    if (user) getBookingByAuthor(user._id);
  }, [user, getBookingByAuthor]);


  const renderDate = date => {
    const updatedDate = moment(date);
    return updatedDate.format("dddd Do MMMM YYYY");
  }

  const renderTimeslots = timeslots =>
    timeslots.map((timeslot) => timeslot.userId === user._id ?
      (<div key={timeslot.id} className="item">{`Tidsspann ${timeslot.timeslot}`}</div>) : null)

  const renderBookings = () =>
    userBookings.map((booking) => {
      const timeslots = renderTimeslots(booking.timeslots);
      return Boolean(timeslots.find(value => value !== null)) ? (
        <div key={booking.id} className="item">
          <i className="large calendar check outline middle aligned icon"></i>
          <div className="content">
            <a className="header" href={`/calendar/${moment(booking.date).format('YYYY')}/${moment(booking.date).format('MM')}/${moment(booking.date).format('DD')}`}>{renderDate(booking.date)}</a>
            <div className="ui list">
              {timeslots}
            </div>
          </div>
        </div>
      ) : null;
    });

  const userErrorMessage = () => {
    newMessage({
      type: 'alert',
      message: 'Du måste vara inloggad för att kunna se dina bokningar.',
    })
  }

  return (
    <div className="ui container">
      <h3>Mina bokningar</h3>
      {auth.isSignedIn ?
        (<div className="ui relaxed divided list">
          {userBookings && renderBookings()}
        </div>) : userErrorMessage()
      }

    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
    bookingData: state.bookingData
  });
}
export default connect(mapStateToProps, { getBookingByAuthor, newMessage })(UserBookings);