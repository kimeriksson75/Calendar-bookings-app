import React, { useEffect, useState } from 'react';
import history from '../history';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash-fp';
import moment from 'moment';
import 'moment/locale/sv';
import CalendarMenu from '../components/CalendarMenu';
import InfoBar from '../components/InfoBar';
import {
  getBookingsByMonth,
  getBookingsByDate,
  createBooking,
  patchBooking,
  newMessage,
} from '../actions';


moment.updateLocale('sv', {
  week: {
    dow: 1
  }
});

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
  
  const { timeslots = [] } = selectedService || {};

  const { year = "", month = "", day = "" } = props.match.params;
  const [totalSlots, setTotalSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment())
  const [selectedDate, setSelectedDate] = useState(moment());

  const [selectedDay, setSelectedDay] = useState(0)

  useEffect(() => {
    if (selectedService?.id) {
      let __currentDate = moment().set({ year, month }).subtract(1, 'month');
      setCurrentDate(__currentDate);
      getBookingsByMonth(selectedService?.id, __currentDate.format());
      setSelectedDay(moment().format('D'));

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService?.id, getBookingsByMonth, setCurrentDate, setSelectedDay, year, month]);

  useEffect(() => {
    if (day) {
      setSelectedDay(day);
    }
  }, [setSelectedDay, day]);
  
  const firstDayOfMonth = () => {
    let firstDay = moment(currentDate)
      .startOf("month")
      .format("d");
    return firstDay;
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
      return (<button key={day + 31} className="calendar-day" data-item={day} onClick={onDayClicked}>{day}{renderCalendarDayBookings(day)}
      </button>);
    // eslint-disable-next-line
    
    
    else
      return (<button key={day + 31} className="calendar-day calendar-day--disabled" data-item={day} onClick={onDayClicked}>{day}{renderCalendarDayBookings(day)}
      </button>);
  }

  const renderCalendarDayBookings = day => {
    if (!calendarBookings || !isSignedIn) return null;
    const bookedDate = calendarBookings.find(booking => moment(booking.date).format('D') === String(day));
    // const fullyBooked = bookedDate?.timeslots.every(timeslot => timeslot.userid);
    return bookedDate && (<div className="sloth-container">
      
      {bookedDate.timeslots.map((timeslot, i) => timeslot.userid ? (<div className="sloth sloth--occupied" key={i}></div>) : (<div className="sloth" key={i}></div>))}
    </div>)
  }
  useEffect(() => {
    if (!calendarBookings || !isSignedIn) {
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
    history.push(`/${selectedService.id}/calendar/${dObject.format('YYYY')}/${dObject.format('MM')}`);
  }

  const onDayClicked = event => {
    if (isFetching) {
      return;
    }
    const date = event.target.dataset.item
    setSelectedDay(date);
    const _selectedDate = moment()
      .set({ year, month })
      .subtract(1, 'month')
      .set({ date })
      .format();
    setSelectedDate(_selectedDate);
  }

  const initiateBooking = async event => {
    let currentDayBooking = calendarBookings.find(booking => moment(booking.date).format('D') === String(selectedDay));
    const emptyApiData = !currentDayBooking;
    if (emptyApiData) {
      currentDayBooking = {
        date: selectedDate,
        service: selectedService.id,
        timeslots: cloneDeep(timeslots)
      }
    }
    let id = event.target.dataset.label;
    const issuedTimeslot = currentDayBooking.timeslots[id];
    issuedTimeslot.userid = user._id;
    issuedTimeslot.username = user.lastname;
    const method = emptyApiData ? createBooking : patchBooking;
    await method(currentDayBooking, user._id);
    getBookingsByMonth(selectedService.id, currentDate.format());

  }

  const initiateDeleteBooking = async event => {
    let id = event.target.dataset.label;
    let currentDayBooking = calendarBookings.find(booking => moment(booking.date).format('D') === String(selectedDay));
    const issuedTimeslot = currentDayBooking.timeslots[id];
    issuedTimeslot.userid = null;
    issuedTimeslot.username = "";
    await patchBooking(currentDayBooking, user._id);
    getBookingsByMonth(selectedService.id, currentDate.format());

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
    if (!calendarBookings || !isSignedIn) {
      return;
    }
    let dayBookings = calendarBookings.find(booking => moment(booking.date).format('D') === String(selectedDay));
    if (!dayBookings) {
      dayBookings = {
        timeslots: cloneDeep(timeslots)
      }
    }
    return (
        <ul>
          {dayBookings.timeslots.map((slot, i) => {
            return (
              <li className={`calendar-day-bookings${calendarDayBookingsStyle(slot)}`} key={i} data-label={i} onClick={slot.userid ? initiateDeleteBooking : initiateBooking}>
                <div className="calendar-day-bookings__content__timeslot"><strong>{slot?.timeslot || ''}</strong></div>
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
          <p>{`Bokningar ${selectedDay}/${month}`}</p>
          {selectedDay && calendarBookings && calendarDayBookings()}
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
export default connect(mapStateToProps, { getBookingsByMonth, getBookingsByDate, createBooking, patchBooking, newMessage })(CalendarView);