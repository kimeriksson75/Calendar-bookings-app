import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getBookingsByAuthor } from '../actions';
import InfoBar from '../components/InfoBar';
import UpcomingUserBookings from '../components/UpcomingUserBookings';
import ArchivedUserBookings from '../components/ArchivedUserBookings';
const UserBookings = props => {
  const {
    auth: { user, isSignedIn },
    selectedService,
    bookingData: { userBookings },
    getBookingsByAuthor,
  } = props;


  useEffect(() => {
    if (user && selectedService) getBookingsByAuthor(selectedService.id, user._id);
  }, [user, getBookingsByAuthor, selectedService]);

  return (
    <div className="page-container user-bookings">
      <InfoBar title="Mina bokningar" description=""/>
      {isSignedIn ? (
        <>
          <h4>Mina kommande bokningar</h4>
          {userBookings && (<UpcomingUserBookings userBookings={userBookings} selectedService={selectedService} user={user} />)}
          <div className="ui divider"></div>
          <h4>Mina avslutade bokningar i <span>{`${moment().format('MMMM')}`}</span></h4>
          {userBookings && (<ArchivedUserBookings userBookings={userBookings} selectedService={selectedService} user={user} />)}
        </>
      ) : (
          <div className="user-bookings-error-message">
            <h4>
              Denna vy kräver inloggning.
            </h4>
            <span>
              <a href="/user/login">Logga in och försök igen.</a>
            </span>
          </div>
      )}  
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
export default connect(mapStateToProps, { getBookingsByAuthor })(UserBookings);