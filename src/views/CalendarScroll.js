import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash-fp';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  getBookingsByMonth,
  createBooking,
  patchBooking,
  newMessage
} from '../actions';
import moment from 'moment';
import 'moment/locale/sv';

const Container = styled.div`
  display: flex;
  flex-dirction: column;
  z-index: 1!important;
`;

const CalendarMonth = styled.div`
  border: 1px solid rgba(0,0,0,0.1);
  text-transform: capitalize;
  padding: 8px 16px 8px 16px;
  height: 120px;
  color: white;
  position: sticky;
  border-radius: 5%;
  margin: 0 0 2px 0;
  `;

const CalendarDayDate = styled(motion.div)`
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    width: 60px;
    height: 60px;
    padding: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1, h2, h3, h4, h5 {
      padding: 0px;
      margin: 0px;
    }
  `;

const CalendarDay = styled(motion.div)`
  border: 1px solid rgba(0,0,0,0.1);
  background-color: rgba(13,139,136,0);
  padding: 8px 16px 8px 16px;
  color: white;
  cursor: pointer;
  text-transform: capitalize;
  min-width: 320px;
  height: 80px;
  display: flex;
  flex-direction: column;
  overflow: visible;
  border-radius: 5px;
  margin: 0 0 2px 0;

`;

const CalendarDaySlot = styled(motion.div)`
  border: 1px solid rgba(0,0,0,0.1);
  background-color: rgba(255,255,255,0.7);
  padding: 8px 16px 8px 16px;
  color: rgba(0,0,0,1);
  cursor: pointer;
  border-radius: 5px;
  margin: 0 0 2px 0;
`;

const CalendarDayOccupiedSlot = styled(motion.div)`
  border: 1px solid rgba(0,0,0,0.1);
  background-color: rgba(0,0,0,0.1);
  padding: 8px 16px 8px 16px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 0 2px 0;
`;
const Sloth = styled.div`
    height: 6px;
    width: 6px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.5);
    margin-top: 2px;
    `;
const OccupiedSlot = styled.div`
    height: 6px;
    width: 6px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: white;
    margin-top: 2px;
  `;

const CalendarStlotContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    `;

const CallendarScroll = props => {

  const {
    auth: { user, isSignedIn },
    selectedService,
    selectedService: {
      timeslots = []
    },
    createBooking,
    patchBooking,
    getBookingsByMonth,
    isFetching,
    bookingData,
    bookingData: {
      calendarBookings = null,
      booking = {}
    },
    newMessage
  } = props;

  const [currentStartDate, setCurrentStartDate] = useState(moment());
  const [currentEndDate, setCurrentEndDate] = useState(moment())
  const [hasRenderedCalendar, setHasRenderedCalendar] = useState(false);
  const [renderBookings] = useState([])
  var [calendarItems, setCalendarItems] = useState([]);

  const renderTimeSlotContent = timeslot => timeslot.userName ? `${timeslot.timeslot} - ${timeslot.userName}` : timeslot.timeslot;
  const renderCalendarDaySlot = (m, timeslot, existingBooking) =>
    <CalendarDaySlot
      whileHover={{ color: 'rgba(255,255,255,1)', backgroundColor: 'rgba(0,0,0,0.5)' }}
      data-date={m.format('YYYY-MM-DD')}
      data-id={existingBooking && existingBooking.id}
      data-label={timeslot.id}
      key={timeslot.id}
      onClick={initiateBooking}>
      {timeslot.timeslot}
    </CalendarDaySlot>;

  const renderCalendar = () => {
    let __calendarItems = [];
    // generate calendar dates
    let a = currentStartDate.startOf('month').format('YYYY-MM-DD');
    let b = currentEndDate.endOf('month').format('YYYY-MM-DD');

    for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
      // begin with calendar month
      if (m.format('D') == 1) __calendarItems.push(
        <CalendarMonth key={m.format('D')}><h2>{m.format('MMMM')}</h2></CalendarMonth>
      );
      // add a calendar day item for each day
      __calendarItems.push(<CalendarDay key={m.format('D')}><CalendarDayDate><h5>{m.format('ddd')}</h5><h3>{m.format('D')}</h3></CalendarDayDate></CalendarDay>)

      // locate date existing booking in calendarBookings
      const existingBooking = renderBookings && _.find(booking => moment(booking.date).format('YYYY-MM-DD') === m.format('YYYY-MM-DD'), renderBookings);

      existingBooking ? existingBooking.timeslots.map(timeslot =>
        __calendarItems.push(timeslot.userId ?
          <CalendarDayOccupiedSlot
            data-id={existingBooking.id}
            data-label={timeslot.id}
            key={timeslot.id}
            onClick={initiateDeleteBooking}>
            {renderTimeSlotContent(timeslot)}
          </CalendarDayOccupiedSlot> :
          renderCalendarDaySlot(m, timeslot, null))) :
        selectedService.timeslots.map(timeslot =>
          __calendarItems.push(renderCalendarDaySlot(m, timeslot, existingBooking)
          )
        )
    }
    console.log('__calendarItems', __calendarItems)
    setCalendarItems(__calendarItems)
  }
  const userErrorMessage = () => {
    newMessage({
      type: 'alert',
      title: 'Du måste vara inloggad för att kunna boka tider.',
      description: 'Logga in och försök igen.'
    })
  }
  const userSuccessMessage = description => {
    newMessage({
      type: 'success',
      title: 'Bokningsbekräftelse',
      description
    })
  }
  const matchedBooking = id => _.find(booking => booking.id === id, renderBookings);

  const initiateBooking = event => {
    if (!isSignedIn) {
      userErrorMessage();
      return;
    };
    let booking = matchedBooking(event.target.dataset.id);
    if (booking === undefined) {
      booking = new Object();
      booking.timeslots = selectedService.timeslots;
    }
    let id = event.target.dataset.label;
    booking.timeslots[id].userId = user._id;
    booking.timeslots[id].userName = `${user.lastname}`;
    booking.date = booking.date ? booking.date : event.target.dataset.date;
    booking.service = selectedService.id;
    booking.id ? patchBooking(booking).then(() => userSuccessMessage('Din bokning har registrerats.')) : createBooking(booking).then(() => userSuccessMessage('Din bokning har registrerats.'));
  }

  const initiateDeleteBooking = event => {
    let booking = matchedBooking(event.target.dataset.id);
    console.log('booking', booking);
    let id = event.target.dataset.label;
    booking.timeslots[id].userId = null;
    booking.timeslots[id].userName = null;
    patchBooking(booking).then(() => userSuccessMessage('Din bokning har avregistrerats.'));

  }

  useEffect(() => {
    getBookingsByMonth(selectedService.id, currentStartDate.format());
  }, [getBookingsByMonth, selectedService, currentStartDate]);

  useEffect(() => {
    calendarBookings && renderBookings.push(calendarBookings);
    console.log('renderBookings', renderBookings, 'calendarBookings', calendarBookings)
    booking && renderCalendar();
  }, [calendarBookings]);


  return (<Container>
    <InfiniteScroll
      dataLength={calendarItems.length}
      next={() => {
        console.log('next!');
        setCurrentEndDate(currentEndDate.add(1, 'month'));
        getBookingsByMonth(selectedService.id, currentEndDate.format());

        renderCalendar();
      }}
      hasMore={true}
      loader={<h4>Laddar...</h4>}
      endMessage={() => { }}
    >
      {calendarItems.map((component, index) => (
        <React.Fragment key={index}>
          {component}
        </React.Fragment>))}
    </InfiniteScroll>
  </Container >)
}
const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
    bookingData: state.bookingData,
    isFetching: state.isFetching,
    selectedService: state.service.selectedService
  })
}
export default connect(mapStateToProps, { createBooking, patchBooking, getBookingsByMonth, newMessage })(CallendarScroll);
