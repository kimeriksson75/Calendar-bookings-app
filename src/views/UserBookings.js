import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { pipe, sortBy, filter } from 'lodash/fp';
import { getBookingByAuthor, newMessage } from '../actions';
import PusherHeader from '../components/PusherHeader';

const UserBookings = props => {
  const {
    auth: { user, isSignedIn },
    bookingData: { userBookings },
    getBookingByAuthor,
    newMessage
  } = props;


  const sortedUserBookings = pipe([
    sortBy(booking => new Date(booking.date)),
    filter(booking => new Date(booking.date) > new Date())
  ])(userBookings);

  useEffect(() => {
    if (user) getBookingByAuthor(user._id);
  }, [user, getBookingByAuthor]);

  const onBookingClick = url => {
    history.push(url);
  }

  const renderDate = date => {
    const updatedDate = moment(date);
    return updatedDate.format("dddd Do MMMM YYYY");
  }

  const renderTimeslots = timeslots =>
    timeslots.map((timeslot) => timeslot.userId === user._id ?
      (<div className="ui item">
        <div key={timeslot.id} className="ui label">
          <i className="check icon teal"></i>
          {timeslot.timeslot}
        </div>
      </div>) : null)

  const renderBookings = () =>
    sortedUserBookings.map((booking) => {
      const timeslots = renderTimeslots(booking.timeslots);
      return Boolean(timeslots.find(value => value !== null)) ? (
        <div className="ui celled grid">
          <div key={booking.id} className="three column row" onClick={() => onBookingClick(`/calendar/${moment(booking.date).format('YYYY')}/${moment(booking.date).format('MM')}/${moment(booking.date).format('DD')}`)}>
            <div className="two wide column">
              <i className="large calendar check green centered outline icon"></i>
            </div>
            <div className="five wide column">
              <div className="ui label" style={{ textTransform: 'capitalize' }} >{renderDate(booking.date)}</div>
            </div>
            <div className="four wide column">
              <div className="ui divided items">
                {timeslots}
              </div>
            </div>
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
        <PusherHeader title="Mina bokningar" subTitle="Kommande sorterat i datumordning" />
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
export default connect(mapStateToProps, { getBookingByAuthor, newMessage })(UserBookings);