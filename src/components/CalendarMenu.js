import React from 'react';
import { Menu, Icon } from 'semantic-ui-react'

const CalendarMenu = props => {
  const { currentDate } = props;

  const currentMonthName = currentDate.localeData().months(currentDate);
  const currentYear = currentDate.year();
  const onChangeMonth = value => {
    props.onChangeMonth(value)
  }
  return (
    <div>
      <Menu>
        <Menu.Item as="a" icon onClick={() => onChangeMonth(-1)}>
          <Icon name="chevron left" ></Icon>
        </Menu.Item>
        <Menu.Item style={{ textTransform: 'capitalize' }}>
          {`${currentMonthName} ${currentYear}`}
        </Menu.Item>
        <Menu.Item as="a" icon onClick={() => onChangeMonth(1)}>
          <Icon name="chevron right"></Icon>
        </Menu.Item>
      </Menu>
    </div>
  )
}
export default CalendarMenu