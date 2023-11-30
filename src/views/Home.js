import React, { useEffect } from 'react';
import Clock from 'react-live-clock';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../history';
import { getServicesByResidence, setSelectedService, getBookingByAuthor, getBookingsByMonth } from '../actions';
import { find, isEmpty } from 'lodash-fp';
import { Dropdown } from 'semantic-ui-react';
import UpcomingUserBookings from '../components/UpcomingUserBookings';
moment.tz.setDefault('Europe/Stockholm');


const Home = props => {
  const {
    auth: {
      isSignedIn = false,
      user = {},
    },
    service: {
      services = [],
      selectedService = {}
    },
    bookingData: { userBookings = [] },
    getServicesByResidence,
    setSelectedService,
    getBookingByAuthor,
  } = props;

  const __currentDate = moment();

  useEffect(() => {
    if (!isSignedIn) {
      history.push('/user/login')
    }
  }, [isSignedIn])
  
  useEffect(() => {
    if (selectedService && !isEmpty(selectedService)) {
      //history.push(`/${selectedService.id}/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}/${__currentDate.format('D')}`)
    }
  }, [selectedService, __currentDate]);

  useEffect(() => {
    if (services.length > 0) {
      setSelectedService(services[0]);
    }
  }, [services, setSelectedService]);

  useEffect(() => {
    if (user && selectedService?._id) {
      console.log('selectedService', selectedService)
      getBookingByAuthor(selectedService._id, user._id);
    }

  }, [selectedService, getBookingByAuthor, user])

  useEffect(() => {
    isSignedIn && user?.residence && getServicesByResidence(user.residence);
    if (!isSignedIn) {
      // history.push('/user/login')
    }
  }, [isSignedIn, getServicesByResidence, user]);


  const [sortedUserBookings, setSortedUserBookings] = React.useState([]);

  useEffect(() => {
    if (userBookings && userBookings.length > 0) {
      const sortedUserBookings = userBookings.sort((a, b) => moment(a.date).diff(moment(b.date)))
      setSortedUserBookings(sortedUserBookings);
    }
  }, [userBookings])
  

  const onChangeService = (e, data) => {
    const service = find({ id: data.value }, services)
    setSelectedService(service);
  }

  const renderServices = services => {
    return (
      <Dropdown
        placeholder="Vad vill du boka?"
        fluid
        selection
        onChange={onChangeService}
        // defaultValue={selectedService && selectedService.id}
        options={services.map(service => ({
          key: service.id,
          value: service.id,
          text: service.name
        }))} />
    )
  }

  const renderNextUserBooking = bookings => {
    const nextTimeSlot = bookings?.find(booking => moment(booking.date).isAfter(moment().startOf('day')))
      .timeslots?.find(timeSlot => timeSlot.userid === user._id && moment.utc(timeSlot.start).tz(moment.tz.guess()).isAfter(moment()));
    console.log('nextTimeSlot utc', moment.utc(nextTimeSlot?.start).format('YYYY-MM-DD HH:mm'))
    console.log('nextTimeSlot local', moment(nextTimeSlot?.start).local().format('YYYY-MM-DD HH:mm'))
    console.log('nextTimeSlot utc local', moment.utc(nextTimeSlot?.start).local().format('YYYY-MM-DD HH:mm'))
    console.log('nextTimeSlot utc offset', moment.utc(nextTimeSlot?.start).format('YYYY-MM-DD HH:mm'))
    console.log('moment.utc(date).tz(moment.tz.guess()', moment.utc(nextTimeSlot?.start).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm'))
    return moment.utc(nextTimeSlot?.start).tz(moment.tz.guess()).fromNow();
  }
  return (
    <div className="page-container">
      <div className="home">
        <div className="home-date">
          <div className="home-date__day"><p>{moment().format("dddd")}</p></div>
          <div className="home-date__date"><p>{moment().format("D")}</p></div>
          <Clock format={'HH:mm'} ticking={true} />

        </div>
        {/* {selectedService &&
          (<div>
            <div className="ui divider"></div>
            <p>Nu kan du påbörja din bokning. Klicka på Kalendern i menyn <Icon size="small" name="bars"></Icon>.</p>
          </div>)} */}
        <div className="ui divider"></div>
          <div className="home-welcome">
          {selectedService && (
            <>
              <h1>Välkommen</h1>
              <p>till {selectedService ? selectedService.name : '...'} <span aria-label='rocket' role="img">🚀</span></p>
              <div className="ui divider"></div>
            </>
            
            )}
          {selectedService && sortedUserBookings?.length > 0 && (
            <>
              <p>{user?.firstname}, din nästa bokning är</p><span> {renderNextUserBooking(sortedUserBookings)}.</span>
            </>
          )}
          </div>
        <div>
          {userBookings?.length > 0 ? (
            <div>
              <div className="ui divider"></div>
              <p>Dina kommande bokningar</p>
              {UpcomingUserBookings({ selectedService, user, userBookings })}
            </div>) : <p>Du har inga kommande bokningar.</p>}
            <div className="ui divider"></div>
        </div>
        {services && services.length > 1 && (
          <div>
            <p>Välj en annan bokningstjänst</p>
            {renderServices(services)}
          </div>
        )}
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return ({
    auth: state.auth,
    service: state.service,
    bookingData: state.bookingData
  })
}
export default connect(mapStateToProps, { getServicesByResidence, setSelectedService, getBookingByAuthor })(Home);