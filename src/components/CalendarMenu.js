import React from 'react';
import { Icon } from 'semantic-ui-react'

const CalendarMenu = props => {
  const { currentDate } = props;

  const currentMonthName = currentDate.localeData().months(currentDate);
  const currentYear = currentDate.year();
  const onChangeMonth = value => {
    props.onChangeMonth(value)
  }
  return (
      <div className="calendar-menu">
        <button onClick={() => onChangeMonth(-1)}>
          <Icon name="chevron left" ></Icon>
        </button>
        <p style={{ textTransform: 'capitalize' }}>
          {`${currentMonthName} ${currentYear}`}
        </p>
        <button onClick={() => onChangeMonth(1)}>
          <Icon name="chevron right"></Icon>
        </button>
      </div>
  )
}
export default CalendarMenu