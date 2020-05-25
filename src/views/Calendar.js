import React, { useEffect, useState } from 'react';
import history from '../history';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Sidebar, Segment } from 'semantic-ui-react';
import _ from 'lodash-fp';
import moment from 'moment';
import 'moment/locale/sv';
import CalendarMenu from '../components/CalendarMenu';
import { getBookingsByMonth } from '../actions';
import PusherHeader from '../components/PusherHeader';

moment.locale('sv', {
  week: {
    dow: 1
  }
});

const CalendarView = props => {

  const { getBookingsByMonth, bookingData: { calendarBookings = null } } = props;

  const { year = "", month = "" } = props.match.params;

  const [currentDate, setCurrentDate] = useState(moment())

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let __currentDate = moment().set({ year, month }).subtract(1, 'month');
    setCurrentDate(__currentDate);
    getBookingsByMonth(__currentDate.format());
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
    text-align: center;
    pointer-events: none;
    opacity: 0.7;
    border: 1px solid rgba(0,0,0,0.1);

  `
  const CalendarDayInvisible = styled.div`
    pointer-events: none;
  `;
  const CalendarWeekDay = styled.div`
    text-align: center;
    text-transform: capitalize;
  `;
  const CalendarStlothContainer = styled.div`
    position: absolute;
    top: 6px;
    right: 4px;
    display: flex;
    flex-direction: column;
    
    `;

  const Sloth = styled.div`
    height: 6px;
    width: 6px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.5);
    margin-top: 2px;
    `;

  const OccupiedSloth = styled.div`
    height: 6px;
    width: 6px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: white;
    margin-top: 2px;
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

  const calendarDayStyle = day => {
    let currentMonth = currentDate.month();
    // eslint-disable-next-line
    if (currentMonth >= moment().month() && day > moment().format('D') || currentMonth > moment().month())
      return (<CalendarDay key={day + 31} className="column teal" data-item={day} onClick={onDayClicked}>{day}{renderCaldendarDayBookings(day)}
      </CalendarDay>);
    // eslint-disable-next-line
    else if (currentMonth === moment().month() && day == moment().format('D'))
      return (<CalendarDay key={day + 31} className="column red" data-item={day} onClick={onDayClicked}>{day}{renderCaldendarDayBookings(day)}
      </CalendarDay>);
    else
      return (<CalendarDayDisabled key={day + 31} className="column teal" data-item={day} onClick={onDayClicked}>{day}{renderCaldendarDayBookings(day)}
      </CalendarDayDisabled>);
  }

  const renderCaldendarDayBookings = day => {
    if (!calendarBookings) return null;
    const bookedDate = _.find(booking => moment(booking.date).format('D') === String(day), calendarBookings);
    return bookedDate && (<CalendarStlothContainer>
      {bookedDate.timeslots.map((timeslot) => timeslot.userId ? (<OccupiedSloth key={timeslot.id}></OccupiedSloth>) : (<Sloth key={timeslot.id}></Sloth>))}
    </CalendarStlothContainer>)
  }

  let blanks = [];
  let daysInMonth = [];
  for (let i = 0; i < firstDayOfMonth() - 1; i++) {
    blanks.push(
      <div key={i} className="column empty"><CalendarDayInvisible >{""}</CalendarDayInvisible></div>
    )
  }

  for (let d = 1; d <= currentDate.daysInMonth(); d++) {
    daysInMonth.push(
      calendarDayStyle(d));
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


  let weekDaysShort = moment.weekdaysShort(true);
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
        {!calendarBookings ?
          (<div className="ui active centered inline loader"></div>) :
          (<div><CalendarMenu currentDate={currentDate} onChangeMonth={onChangeMonth} />
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
          )}
      </Segment>
    </Sidebar.Pusher >
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    bookingData: state.bookingData
  })
}
export default connect(mapStateToProps, { getBookingsByMonth })(CalendarView);