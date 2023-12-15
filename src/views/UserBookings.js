import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getBookingByAuthor, newMessage } from '../actions';
import InfoBar from '../components/InfoBar';
import UpcomingUserBookings from '../components/UpcomingUserBookings';
import ArchivedUserBookings from '../components/ArchivedUserBookings';
const UserBookings = props => {
  const {
    auth: { user, isSignedIn },
    selectedService,
    bookingData: { userBookings },
    getBookingByAuthor,
    newMessage
  } = props;


  useEffect(() => {
    if (user && selectedService) getBookingByAuthor(selectedService.id, user._id);
  }, [user, getBookingByAuthor, selectedService]);

  const userErrorMessage = () => {
    newMessage({
      type: 'error',
      title: 'Dennay vy kräver inglogg.',
      description: 'Logga in och försök igen.'
    })
  }

  return (
    <div className="page-container">
      <InfoBar title="Dina kommande bokningar" description="- Sorterat i datumordning"/>
        {isSignedIn ?
          (<div>
          {userBookings && (<UpcomingUserBookings userBookings={userBookings} selectedService={selectedService} user={user} />)}
          </div>) : userErrorMessage()
      }
      <div className="ui divider"></div>
      <h3>Dina avslutade bokningar i <span>{`${moment().format('MMMM')}`}</span></h3>
        {userBookings && (<ArchivedUserBookings userBookings={userBookings} selectedService={selectedService} user={user} />)}
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