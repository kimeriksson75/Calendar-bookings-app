import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import _, { sortBy, omit, map } from 'lodash/fp';
import { getBookingByAuthor, newMessage, toggleSidebar } from '../actions';
import PusherHeader from '../components/PusherHeader';

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
    return updatedDate.format("dddd Do MMMM YYYY");
  }

  const renderTimeslots = timeslots =>
    timeslots.map((timeslot) => timeslot.userId === user._id ?
      (<li key={timeslot.id} className="item">{`${timeslot.timeslot}`}</li>) : null)

  const renderBookings = () =>
    sortedUserBookings.map((booking) => {
      const timeslots = renderTimeslots(booking.timeslots);
      return Boolean(timeslots.find(value => value !== null)) ? (
        <div key={booking.id} className="ui relaxed divided list">
          <a className="item" href={`/calendar/${moment(booking.date).format('YYYY')}/${moment(booking.date).format('MM')}/${moment(booking.date).format('DD')}`}>
            <i className="large calendar check green outline icon"></i>
            <div className="content">
              <div className="header" style={{ textTransform: 'capitalize' }} >{renderDate(booking.date)}</div>
              <ul className="description">
                {timeslots}
              </ul>
            </div>
          </a>
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
        <PusherHeader title="Mina bokningar" subTitle="Kommande sorterat i datumordning" />
        {isSignedIn ?
          (<div className="ui container">
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