import React, { useEffect } from 'react';
import Clock from 'react-live-clock';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../history';
import { getServicesByResidence, setSelectedService, getBookingsByAuthor, getBookingsByDateSpan } from '../actions';
import { find, isEmpty } from 'lodash-fp';
import { Dropdown } from 'semantic-ui-react';
import UpcomingUserBookings from '../components/UpcomingUserBookings';
import NextAvailableTimeslot from '../components/NextAvailableTimeslot';
import duration from '../utils/duration';
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
    bookingData: { userBookings = [], booking = [] },
    getServicesByResidence,
    setSelectedService,
    getBookingsByAuthor,
    getBookingsByDateSpan
  } = props;

  const { timeslots = [], alternateTimeslots = [] } = selectedService || {};

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
    if (!isEmpty(selectedService)) {
      return;
    }
    if (services.length > 0) {
      setSelectedService(services[0]);
    }
  }, [services, setSelectedService]);

  useEffect(() => {
    // if (userBookings?.length > 0) {
    //   return;
    // }
    if (user && selectedService?._id) {
      getBookingsByAuthor(selectedService._id, user._id);
    }

  }, [selectedService, getBookingsByAuthor, user])

  useEffect(() => {
    if (!isEmpty(selectedService)) {
      return;
    }
    isSignedIn && user?.residence && getServicesByResidence(user.residence);
    if (!isSignedIn) {
      // history.push('/user/login')
    }
  }, [isSignedIn, getServicesByResidence, user]);


  const [sortedUserBookings, setSortedUserBookings] = React.useState([]);
  const removeEmptyUserBooking = userBookings => userBookings
    .filter(booking =>
      booking.timeslots.reduce((acc, timeslot) => acc || timeslot.userid === user._id, false) ||
      booking.alternateTimeslots.reduce((acc, timeslot) => acc || timeslot.userid === user._id, false))
  
  useEffect(() => {
    if (userBookings && userBookings.length > 0) {
      const reducedUserBookings = removeEmptyUserBooking(userBookings);
      const sortedUserBookings = reducedUserBookings.sort((a, b) => moment(a.date).diff(moment(b.date)))
      setSortedUserBookings(sortedUserBookings);
    }
  }, [userBookings])

  useEffect(() => {
    if(selectedService && selectedService._id) {
      getBookingsByDateSpan(selectedService._id, moment().startOf('day').format(), moment().add({ month: 1 }).endOf('day').format());
    }

  }, [selectedService, getBookingsByDateSpan])

  useEffect(() => {
    if (booking && booking.length > 0) {
    }
  }, [booking])
  

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

    const isWeekDay = (day) => {
      const dayOfWeek = moment()
        .set({ date: day })
        .isoWeekday();
      return dayOfWeek !== 6 && dayOfWeek !== 7;
    }
    
    const isAlternateTimeslots = (day) => {
      const hasAlternateTimeslots = alternateTimeslots.length > 0;
      if (!hasAlternateTimeslots) {
        return true;
      }
      return isWeekDay(day);
    }
    let renderDuration = null;
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      const issuedTimeslots = isAlternateTimeslots(moment.utc(booking.date).format('D')) ? booking.timeslots : booking.alternateTimeslots;
      const issuedTimeslot = issuedTimeslots?.find(timeslot =>
        timeslot.userid === user._id && moment.utc(timeslot.start).isAfter(__currentDate)
        ) || null;
      if (issuedTimeslot) {
        renderDuration = duration({ start: moment(), end: moment(issuedTimeslot.start).subtract({ hours: 1  }) });
        break;
      }
    }
    return renderDuration;
  }

  const isFutureUserBookings = userBookings => {
    return userBookings.reduce((acc, booking) => {
      const timeslots = [...booking.timeslots, ...booking.alternateTimeslots];
      const timeslot = timeslots.find(timeslot => timeslot.userid === user._id && moment.utc(timeslot.start).isAfter(__currentDate));
      return acc || Boolean(timeslot);
    }, false)
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
        </div>
        {selectedService && booking?.length > 0 && (
          <div data-testid="next-available-timeslot">
            <NextAvailableTimeslot selectedService={selectedService} bookings={booking} />
          <div className="ui divider"></div>
          </div>
        )}
        {selectedService && userBookings?.length > 0 && sortedUserBookings?.length > 0 && isFutureUserBookings(userBookings) && (
            <div data-testid="next-user-booking" className="home-welcome">
              <h3>Din nästa bokning är om</h3>
              <h4><span>{`${renderNextUserBooking(sortedUserBookings)}`}</span></h4>
              <div className="ui divider"></div>
            </div>
          )}
        <div>
          {userBookings?.length && isFutureUserBookings(userBookings) > 0 ? (
            <div data-testid="upcoming-user-bookings">
              <p>Dina kommande bokningar</p>
              <UpcomingUserBookings selectedService={selectedService} user={user} userBookings={sortedUserBookings} />
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
export default connect(mapStateToProps, { getServicesByResidence, setSelectedService, getBookingsByAuthor, getBookingsByDateSpan })(Home);