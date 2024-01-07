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
      <div data-testid="calendar-menu" className="calendar-menu">
        <button data-testid="calendar-menu-prev-month" onClick={() => onChangeMonth(-1)}>
          <Icon name="chevron left" ></Icon>
        </button>
        <span style={{ textTransform: 'capitalize' }}>
          {`${currentMonthName} ${currentYear}`}
        </span>
        <button data-testid="calendar-menu-next-month" onClick={() => onChangeMonth(1)}>
          <Icon name="chevron right"></Icon>
        </button>
      </div>
  )
}
export default CalendarMenu