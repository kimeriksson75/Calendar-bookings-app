import React from 'react';
import history from '../history';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/sv';
import CalendarMenu from '../components/CalendarMenu';
import { setCurrentDate, setSelectedDate } from '../actions';

moment.locale('sv');

const CalendarView = props => {

  const { calendar } = props;
  const { currentDate } = calendar;

  const { year = "", month = "" } = props.match.params;
  const __currentDate = currentDate ? currentDate : moment().set({ year, month }).subtract(1, 'month');

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

  const firstDayOfMonth = () => {
    let firstDay = moment(__currentDate)
      .startOf("month")
      .format("d");
    return firstDay;
  }

  const onDayClicked = event => {
    let date = event.target.attributes.getNamedItem('data-item').value;
    history.push(`/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}/${date}`);
  }

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <div key={i} className="column empty"><CalendarDayDisabled >{""}</CalendarDayDisabled></div>
    )
  }


  const calendarDayStyle = day => {
    let currentMonth = __currentDate.month();
    let style;

    if (currentMonth >= moment().month() && day > moment().format('D') || currentMonth > moment().month())
      style = 'column teal'
    else if (currentMonth === moment().month() && day == moment().format('D'))
      style = 'column red';
    else
      style = 'column teal';
    return style;
  }

  let daysInMonth = [];
  for (let d = 1; d <= __currentDate.daysInMonth(); d++) {
    daysInMonth.push(
      <CalendarDay key={d + 31} className={calendarDayStyle(d)} data-item={d} onClick={onDayClicked}>{d}
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
    let dObject = Object.assign({}, __currentDate);
    dObject = moment(dObject).add(value, 'months');
    history.push(`/calendar/${dObject.format('YYYY')}/${dObject.format('MM')}`);
  }
  return (
    <div className="ui container">
      <h3>Kalender</h3>
      <div><CalendarMenu currentDate={__currentDate} onChangeMonth={onChangeMonth} />
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
    </div >
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    calendar: state.calendar
  })
}
export default connect(mapStateToProps, { setCurrentDate, setSelectedDate })(CalendarView);