import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBookingByAuthor, newMessage } from '../actions';
import InfoBar from '../components/InfoBar';
import UpcomingUserBookings from '../components/UpcomingUserBookings';
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
      <InfoBar title="Kommande bokningar" description="- Sorterat i datumordning"/>
        {isSignedIn ?
          (<div>
          {userBookings && UpcomingUserBookings({ selectedService, user, userBookings })}
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