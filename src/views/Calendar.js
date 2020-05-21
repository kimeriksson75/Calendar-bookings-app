import React, { useEffect, useState } from 'react';
import history from '../history';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import _ from 'lodash-fp';
import moment from 'moment';
import 'moment/locale/sv';
import CalendarMenu from '../components/CalendarMenu';
import { getBookingsByMonth, toggleSidebar } from '../actions';
import PusherHeader from '../components/PusherHeader';

moment.locale('sv');

const CalendarView = props => {

  const { getBookingsByMonth, toggleSidebar, bookingData: { calendarBookings } } = props;

  const { year = "", month = "" } = props.match.params;

  const [currentDate, setCurrentDate] = useState(moment())

  useEffect(() => {
    let __currentDate = moment().set({ year, month }).subtract(1, 'month');
    getBookingsByMonth(__currentDate.format());
    setCurrentDate(__currentDate);
  }, [getBookingsByMonth, setCurrentDate, year, month]);

  const CalendarDay = styled.div`
    text-align: center;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.1);
    width: 90%;
    :hover .calendar-day-hover {
      background-color: black;
    }
  `;
  const CalendarDayDisabled = styled.div`
    pointer-events: none;
  `
  const CalendarWeekDay = styled.div`
    text-align: center;
    text-transform: capitalize;
  `;
  const CalendarStlothContainer = styled.div`
    position: absolute;
    top: 12px;
    right: 0px;
    display: flex;
    flex-direction: column;
    `;

  const Sloth = styled.div`
    border-top: 1px solid white;
    height: 8px;
    width: 6px
    `;

  const OccupiedSloth = styled.div`
    border-top: 1px solid rgba(0,0,0,0.3);
    height: 8px;
    width: 6px
  `;
  const firstDayOfMonth = () => {
    let firstDay = moment(currentDate)
      .startOf("month")
      .format("d");
    return firstDay;
  }

  const onDayClicked = event => {
    let date = event.target.dataset.item;
    history.push(`/calendar/${currentDate.format('YYYY')}/${currentDate.format('MM')}/${date}`);
  }

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <div key={i} className="column empty"><CalendarDayDisabled >{""}</CalendarDayDisabled></div>
    )
  }

  const calendarDayStyle = day => {
    let currentMonth = currentDate.month();
    let style;
    // eslint-disable-next-line
    if (currentMonth >= moment().month() && day > moment().format('D') || currentMonth > moment().month())
      style = 'column teal'
    // eslint-disable-next-line
    else if (currentMonth === moment().month() && day == moment().format('D'))
      style = 'column red';
    else
      style = 'column teal';
    return style;
  }

  const renderCaldendarDayBookings = day => {
    if (!calendarBookings) return null;
    const bookedDate = _.find(booking => moment(booking.date).format('D') === String(day), calendarBookings);
    return bookedDate && (<CalendarStlothContainer>
      {bookedDate.timeslots.map((timeslot) => timeslot.userId ? (<Sloth key={timeslot.id}></Sloth>) : (<OccupiedSloth key={timeslot.id}></OccupiedSloth>))}
    </CalendarStlothContainer>)
  }
  let daysInMonth = [];
  for (let d = 1; d <= currentDate.daysInMonth(); d++) {
    daysInMonth.push(
      <CalendarDay key={d + 31} className={calendarDayStyle(d)} data-item={d} onClick={onDayClicked}>{d}{renderCaldendarDayBookings(d)}
      </CalendarDay >);
  }

  var totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) cells.push(row);
    else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) rows.push(cells);
  });
  let days = rows.map((d, i) => {
    if (i === 0) return null;
    return <div className="seven column row" key={i}>{d}</div>
  })


  let weekDaysShort = moment.weekdaysShort();
  let weekDaysShortName = weekDaysShort.map(day => {
    return (<CalendarWeekDay key={day} className="column">
      {day}
    </CalendarWeekDay>)
  })

  const onChangeMonth = value => {
    let dObject = Object.assign({}, currentDate);
    dObject = moment(dObject).add(value, 'months');
    history.push(`/calendar/${dObject.format('YYYY')}/${dObject.format('MM')}`);
  }
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <PusherHeader title="Kalender" subTitle="" />
        <div><CalendarMenu currentDate={currentDate} onChangeMonth={onChangeMonth} />
          <div className="ui celled grid">
            <div className="seven column row">
              {weekDaysShortName}
            </div>
          </div>
          <div className="ui celled grid">
            <div className="ui grid">
              {days}
            </div>
          </div>
        </div>
      </Segment>
    </Sidebar.Pusher >
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    bookingData: state.bookingData
  })
}
export default connect(mapStateToProps, { getBookingsByMonth, toggleSidebar })(CalendarView);