import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import _, { sortBy, omit, map } from 'lodash/fp';
import { getBookingByAuthor, newMessage, toggleSidebar } from '../actions';

const UserBookings = props => {
  const {
    auth: { user, isSignedIn },
    bookingData: { userBookings },
    getBookingByAuthor,
    newMessage,
    toggleSidebar
  } = props;


  const sortedUserBookings = _.pipe(
    sortBy(booking => new Date(booking.date)),
    map(booking => omit([new Date(booking.date) < new Date()], booking))

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
    <Sidebar.Pusher>
      <Segment basic>
        <Icon name="bars" size="large" onClick={toggleSidebar}></Icon>
        <h3>Mina kommande bokningar</h3>
        {isSignedIn ?
          (<div>
            {userBookings && renderBookings()}
          </div>) : userErrorMessage()
        }
      </Segment>
    </Sidebar.Pusher >
  )
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
    bookingData: state.bookingData
  });
}
export default connect(mapStateToProps, { getBookingByAuthor, newMessage, toggleSidebar })(UserBookings);