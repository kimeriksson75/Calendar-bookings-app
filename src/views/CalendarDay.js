import React, { useState, useEffect } from 'react';
import { Menu, Sidebar, Segment, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  setSelectedDate,
  createBooking,
  patchBooking,
  getBookingsByDate,
  newMessage,
} from '../actions';

import history from '../history';
import PusherHeader from '../components/PusherHeader';

const CalendarDay = props => {

  const {
    auth: { user, isSignedIn },
    createBooking,
    patchBooking,
    getBookingsByDate,
    newMessage,
    bookingData,
  } = props;

  const { booking = {} } = bookingData;
  let emptyApiData = _.isEmpty(booking);

  const { year = "", month = "", date = "" } = props.match.params;
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    let _selectedDate = moment()
      .set({ year, month, date })
      .subtract(1, 'month');
    getBookingsByDate(_selectedDate.format());
    setSelectedDate(_selectedDate);
  }, [getBookingsByDate, year, month, date, setSelectedDate])

  const timeslots = [
    { timeslot: '07.00 - 10.00', id: 0 },
    { timeslot: '10.00 - 14.00', id: 1 },
    { timeslot: '14.00 - 18.00', id: 2 },
    { timeslot: '18.00 - 21.00', id: 3 },
  ];

  if (emptyApiData) booking.timeslots = timeslots

  const onCloseCalendar = () => {
    history.push(`/calendar/${year}/${month}`);
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
  const initiateBooking = event => {
    if (!isSignedIn) {
      userErrorMessage();
      return;
    };
    let id = event.target.dataset.label;
    booking.timeslots[id].userId = user._id;
    booking.timeslots[id].userName = `${user.lastname} ${user.apartmentid}`;
    booking.date = emptyApiData ? selectedDate : booking.date;
    emptyApiData ? createBooking(booking).then(() => userSuccessMessage('Din bokning har registrerats.')) : patchBooking(booking).then(() => userSuccessMessage('Din bokning har registrerats.'));
  }

  const initiateDeleteBooking = event => {
    let id = event.target.dataset.label;
    booking.timeslots[id].userId = null;
    booking.timeslots[id].userName = null;
    patchBooking(booking).then(() => userSuccessMessage('Din bokning har avregistrerats.'));
  }

  const renderTimeSlots = () => {
    const { timeslots } = booking;
    return (
      timeslots.map((slot, i) => {
        const className = slot => {
          if (!isSignedIn) return 'button small ui red disabled';
          else if (slot.userId && slot.userId !== user._id) return 'button small ui red disabled';
          else return 'button small ui teal selectable';
        }
        return (
          <div key={i} className="two column row">
            <div className="column" key={slot.timeslot} >
              <button className={className(slot)} data-label={slot.id} onClick={slot.userId ? initiateDeleteBooking : initiateBooking}>{slot.timeslot}</button>
            </div>
            <div className="column" key={slot.id} data-label={slot.userId ? slot.userId : ''}>
              {slot.userName && (
                <div className="ui label">
                  <i className="check icon teal"></i>
                  {slot.userName}
                </div>
              )}
            </div>
          </div>
        )
      }
      )
    )
  }
  const onChangeDay = value => {
    let dObject = Object.assign({}, selectedDate);
    dObject = moment(dObject).add(value, 'day');
    history.push(`/calendar/${dObject.format('YYYY')}/${dObject.format('MM')}/${dObject.format('DD')}`);
  }
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <PusherHeader title="Kalenderdag" subTitle="" />
        <Menu>
          <Menu.Item as="a" icon onClick={() => onChangeDay(-1)}>
            <Icon name="chevron left" ></Icon>
          </Menu.Item>
          <Menu.Item style={{ textTransform: 'capitalize' }}>
            {selectedDate && selectedDate.format("dddd Do MMMM")}
          </Menu.Item>
          <Menu.Item as="a" icon onClick={() => onChangeDay(1)}>
            <Icon name="chevron right" ></Icon>
          </Menu.Item>
        </Menu>
        <div className="ui celled grid">
          <div className="two column row">
            <div className="column">Tider</div>
            <div className="column">Bokad av</div>
          </div>
        </div>
        <div className="ui celled grid">
          {booking.timeslots && renderTimeSlots()}
        </div>
        {/* <div className="ui divider"></div> */}
        <div className="extra content">
          <div className="ui two buttons">
            <div className="ui teal button" onClick={() => onCloseCalendar()} > Tillbaka till kalendermånad</div>
          </div>
        </div>
      </Segment>
    </Sidebar.Pusher >
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    selectedDate: state.calendar.selectedDate,
    auth: state.auth,
    userProfile: state.auth.userProfile,
    bookingData: state.bookingData
  })

}
export default connect(mapStateToProps, {
  setSelectedDate,
  createBooking,
  patchBooking,
  getBookingsByDate,
  newMessage,
})(CalendarDay);