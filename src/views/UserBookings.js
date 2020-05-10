import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { flow, sortBy, omit, map } from 'lodash/fp';
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
  const sortedUserBookings = flow(
    sortBy(dateObject => new Date(dateObject.date)),
    omit(dateObject => new Date(dateObject.date) > new Date()),
    map(dateObject => dateObject)
  )(userBookings);

  useEffect(() => {
    if (user) getBookingByAuthor(user._id);
  }, [user, getBookingByAuthor]);


  const renderDate = date => {
    const updatedDate = moment(date);
    return updatedDate.format("ddd Do MMM YYYY");
  }

  const renderTimeslots = timeslots =>
    timeslots.map((timeslot) => timeslot.userId === user._id ?
      (<div key={timeslot.id} className="item">{`${timeslot.timeslot}`}</div>) : null)

  const renderBookings = () =>
    sortedUserBookings.map((booking) => {
      const timeslots = renderTimeslots(booking.timeslots);
      return Boolean(timeslots.find(value => value !== null)) ? (
        <div key={booking.id} className="ui two column row celled grid">
          <div className="column">
            <i className="large calendar check outline blue middle aligned icon"></i>
            <a className="header" style={{ textTransform: 'capitalize' }} href={`/calendar/${moment(booking.date).format('YYYY')}/${moment(booking.date).format('MM')}/${moment(booking.date).format('DD')}`}>{renderDate(booking.date)}</a>
          </div>
          <div className="column teal">
            {timeslots}
          </div>
        </div>
      ) : null;
    });

  const userErrorMessage = () => {
    newMessage({
      type: 'error',
      title: 'Dennay vy kräver inglogg.',
      description: 'Logga in och försök igen.'
    })
  }

  return (
    <div className="ui container">
      <h3>Mina kommande bokningar</h3>
      {auth.isSignedIn ?
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
    bookingData: state.bookingData
  });
}
export default connect(mapStateToProps, { getBookingByAuthor, newMessage })(UserBookings);