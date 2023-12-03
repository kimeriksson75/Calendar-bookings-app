import React, { useEffect, useState, useCallback } from 'react';
import history from '../history';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash-fp';
import moment from 'moment';
import 'moment/locale/sv';
import CalendarMenu from '../components/CalendarMenu';
import InfoBar from '../components/InfoBar';
import {
  getBookingsByMonth,
  createBooking,
  patchBooking,
  newMessage,
} from '../actions';
import useSocketIO from '../hooks/useSocketIO';
moment.updateLocale('sv', {
  week: {
    dow: 1
  }
});
moment.tz.setDefault('Europe/Stockholm');

const CalendarView = props => {

  const {
    auth: { user, isSignedIn },
    selectedService,
    getBookingsByMonth,
    patchBooking,
    createBooking,
    isFetching,
    bookingData: { calendarBookings = [] }
  } = props;
  
  const { timeslots = [], alternateTimeslots = [] } = selectedService || {};

  const { year = "", month = "", day = "" } = props.match.params;
  const [totalSlots, setTotalSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment())
  const [selectedDate, setSelectedDate] = useState(moment());

  const [selectedDay, setSelectedDay] = useState(0)

  const [dayBookingsCache, setDayBookingsCache] = useState(null);
  const { updatedBookings } = useSocketIO();

  
  useEffect(() => {
    if (updatedBookings) {
      const { service = null, date = null } = updatedBookings;
      if (!service || !date) {
        return;
      }
      if (service === selectedService?.id && moment(date).format('YYYY-MM') === selectedDate.format('YYYY-MM')) {
        getBookingsByMonth(selectedService?.id, selectedDate.format());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedBookings, selectedService?.id]);
  useEffect(() => {
    if (selectedService?.id && isSignedIn) {
      let __currentDate = moment().set({ year, month }).subtract(1, 'month');
      setCurrentDate(__currentDate);
      getBookingsByMonth(selectedService?.id, selectedDate.format());

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService?.id, selectedDate, isSignedIn]);

  useEffect(() => {
    if (year && month) {
      let __currentDate = moment().set({ year, month }).subtract(1, 'month');
      
      setSelectedDate(__currentDate);
      setDayBookingsCache(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day, selectedService?.id]);
  
  useEffect(() => {
    if (day) {
      setSelectedDay(parseInt(day));
      let __currentDate = moment().set({ year, month, date: day }).subtract(1, 'month');
      setSelectedDate(__currentDate);
      setDayBookingsCache(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, year, month, selectedService?.id]);
  const firstDayOfMonth = () => {
    let firstDay = moment(currentDate)
      .startOf("month")
      .format("d");
    return firstDay;
  }
  const isWeekDay = (day) => {
    const dayOfWeek = moment(currentDate)
      .set({ date: day })
      .isoWeekday();
    return dayOfWeek !== 6 && dayOfWeek !== 7;
  }

  const timeslotsByDate = booking => {
    const hasAlternateTimeslots = booking?.alternateTimeslots;
    if (!hasAlternateTimeslots) {
      return booking.timeslots;
    }
    return isWeekDay(moment(booking.date).format('D')) ? booking.timeslots : booking.alternateTimeslots;
  }
  const calendarDayStyle = day => {
    let currentMonth = currentDate.month();
    let currentYear = currentDate.year();
    // eslint-disable-next-line
    if (selectedDay == day && day != moment().format('D')) {
      return (<button key={day + 31} className="calendar-day calendar-day--selected" data-item={day} onClick={onDayClicked}>{day}{renderCalendarDayBookings(day)}
      </button>);
    }
    else if (currentMonth === moment().month() && String(day) === moment().format('D'))
      return (<button key={day + 31} className="calendar-day calendar-day--today" data-item={day} onClick={onDayClicked}>{day}{renderCalendarDayBookings(day)}
      </button>);

    else if ((currentMonth >= moment().month() && day > moment().format('D')) || currentMonth > moment().month() || currentYear > moment().year())
      return (<button key={day + 31} className={`calendar-day ${isWeekDay(day) ? '' : 'calendar-day--weekend'}`} data-item={day} onClick={onDayClicked}>{day}{renderCalendarDayBookings(day)}
      </button>);
    // eslint-disable-next-line
    
    else
      return (<button key={day + 31} className="calendar-day calendar-day--disabled" data-item={day} onClick={onDayClicked}>{day}{renderCalendarDayBookings(day)}
      </button>);
  }
  
  const renderCalendarDayBookings = day => {
    if (!calendarBookings || !isSignedIn) return;
    const bookedDate = calendarBookings.find(booking => moment(booking.date).format('D') === String(day));
    // const fullyBooked = bookedDate?.timeslots.every(timeslot => timeslot.userid);
    return bookedDate && (<div className="sloth-container">
      {timeslotsByDate(bookedDate)?.map((timeslot, i) => timeslot.userid ? (<div className="sloth sloth--occupied" key={i}></div>) : (<div className="sloth" key={i}></div>))}
    </div>)
  }
  useEffect(() => {
    if (!calendarBookings || !isSignedIn || !user) {
      return;
    }
    
    let blanks = [];
    let daysInMonth = [];
    for (let i = 1; i < firstDayOfMonth(); i++) {
      blanks.push(
        <div key={i} className="calendar-day empty"><div >{""}</div></div>
      )
    }

    for (let d = 1; d <= currentDate.daysInMonth(); d++) {
      daysInMonth.push(
        calendarDayStyle(d));
    }

    setTotalSlots([...blanks, ...daysInMonth]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTotalSlots, currentDate, calendarBookings, selectedDay]);
  
  let weekDaysShort = moment.weekdaysShort(true);
  let weekDaysShortName = weekDaysShort.map(day => {
    return (<div key={day} className="calendar-day calendar-day--weekday">
      {day}
    </div>)
  })

  const onChangeMonth = value => {
    let dObject = Object.assign({}, currentDate);
    dObject = moment(dObject).add(value, 'months');
    let day = moment().format('D');
    if (dObject.isAfter(moment())) {
      day = '1';
    }
    history.push(`/${selectedService.id}/calendar/${dObject.format('YYYY')}/${dObject.format('MM')}/${day}`);
  }

  const onDayClicked = event => {
    if (isFetching) {
      return;
    }
    const date = event.target.dataset.item
    const _selectedDate = moment()
    .set({ year, month })
    .subtract(1, 'month')
    .set({ date })
    history.push(`/${selectedService.id}/calendar/${_selectedDate.format('YYYY')}/${_selectedDate.format('MM')}/${_selectedDate.format('D')}`);
  }
  const isAlternateTimeslots = (day) => {
    const hasAlternateTimeslots = alternateTimeslots.length > 0;
    if (!hasAlternateTimeslots) {
      return true;
    }
    return isWeekDay(day);
  }

  const tempCurrentDayBooking = () => {
    const dayBooking = calendarBookings?.find(booking => moment(booking.date).format('D') === String(selectedDay));
    
    if (!dayBooking && dayBookingsCache) {
      return dayBookingsCache;
    }
    if (!dayBooking) {
      return null;
    }
    setDayBookingsCache(dayBooking);
    return {
      ...dayBooking
    };
  }

  const initiateBooking = async event => {
    let id = event.currentTarget.getAttribute('data-label');
    if (!id) {
      return;
    }
    let currentDayBooking = tempCurrentDayBooking()
    const emptyApiData = !currentDayBooking;
    if (emptyApiData) {
      currentDayBooking = {
        date: selectedDate,
        service: selectedService.id,
        timeslots: cloneDeep(timeslots),
        ...(alternateTimeslots.length > 0 && { alternateTimeslots: cloneDeep(alternateTimeslots)})
      }
    }
    const issuedTimeslot = isAlternateTimeslots(selectedDay) ? currentDayBooking.timeslots[id] : currentDayBooking.alternateTimeslots[id];
    issuedTimeslot.userid = user._id;
    issuedTimeslot.username = user.lastname;
    issuedTimeslot.start = moment.utc(issuedTimeslot.start).set({ year, month, date: selectedDay }).subtract({ month: 1 }).toISOString();
    issuedTimeslot.end = moment.utc(issuedTimeslot.end).set({ year, month, date: selectedDay }).subtract({ month: 1 }).toISOString();
    const method = emptyApiData ? createBooking : patchBooking;
    await method(currentDayBooking, user._id);
    getBookingsByMonth(selectedService?.id, selectedDate.format());
  }

  const initiateDeleteBooking = async event => {
    let id = event.currentTarget.getAttribute('data-label');
    if (!id) {
      return;
    }
    let currentDayBooking = tempCurrentDayBooking()
    const issuedTimeslot = isAlternateTimeslots(selectedDay) ? currentDayBooking.timeslots[id] : currentDayBooking.alternateTimeslots[id];
    issuedTimeslot.userid = null;
    issuedTimeslot.username = "";
    await patchBooking(currentDayBooking, user._id);

  }

  const calendarDayBookingsStyle = slot => {
    if (!slot.userid) {
      return '--vacant'
    }
    if (slot.userid && slot.userid !== user._id) {
      return '--occupied'
    }
    if (slot.userid && slot.userid === user._id) {
      return '--booked'
    }
  }
  const calendarDayBookings = () => {
    let dayBookings = calendarBookings?.find(booking => moment(booking.date).format('D') === String(selectedDay)) || dayBookingsCache;
    
    if (!dayBookings) {
      dayBookings = {
        timeslots: cloneDeep(timeslots),
        alternateTimeslots: cloneDeep(alternateTimeslots)
        
      }
    }
    
    let renderTimeslots = isAlternateTimeslots(selectedDay) ? dayBookings.timeslots : dayBookings.alternateTimeslots;
    const renderTimeslot = ({ start, end }) => {
      const rStart = moment.utc(start).format('HH:mm');
      const rEnd = moment.utc(end).format('HH:mm');
      return `${rStart} - ${rEnd}`
    }
    return (
        <ul>
          {renderTimeslots?.map((slot, i) => {
            return (
              <li className={`calendar-day-bookings-animate calendar-day-bookings${calendarDayBookingsStyle(slot)}`} key={i} data-label={i} onClick={slot.userid ? initiateDeleteBooking : initiateBooking}>
                {slot.userid ?
                  <i className="large calendar check centered outline icon"></i>
                  :
                  <i className="large calendar centered outline icon"></i>}
                <div className="calendar-day-bookings__content__timeslot"><strong>{renderTimeslot(slot)}</strong></div>
                <div className="calendar-day-bookings__content__user">{slot?.username || ''}</div>
              </li>
              )
          }) 
          }
        </ul>
    )
  }
  return (
    <div className="calendar-container">
      {selectedService && (<InfoBar title={ selectedService.name} />)}
      
        <div className="calendar-content">
          <CalendarMenu currentDate={currentDate} onChangeMonth={onChangeMonth} />
          {isFetching ?
            (<div style={{ height: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="ui active centered inline loader" ></div>
            </div>) :
            (<React.Fragment>
              <div className="calendar">
                  {weekDaysShortName}
                  {totalSlots}
              </div>
            </React.Fragment>
            )}
      </div>
        <div className="calendar-day-bookings">
          <>
          <h3><span>{`Bokningar ${selectedDate.locale('SE').format('ddd')} `}</span>{`${selectedDate.locale('SE').format('Do')} `}<span>{`${selectedDate.locale('SE').format('MMMM')}`}</span></h3>
            {calendarDayBookings()}
          </>
        </div>
      </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    auth: state.auth,
    bookingData: state.bookingData,
    isFetching: state.isFetching,
    selectedService: state.service.selectedService
  })
}
export default connect(mapStateToProps, { getBookingsByMonth, createBooking, patchBooking, newMessage })(CalendarView);