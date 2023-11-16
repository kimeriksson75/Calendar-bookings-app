import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Sidebar, Container, Icon } from 'semantic-ui-react';
import { cloneDeep, isEmpty } from 'lodash-fp';
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
import InfoBar from '../components/InfoBar';

const CalendarDay = props => {

  const {
    auth: { user, isSignedIn },
    selectedService,
    createBooking,
    patchBooking,
    getBookingsByDate,
    newMessage,
    bookingData,
    isFetching
  } = props;

  const { booking = {} } = bookingData || {};
  const { timeslots = [] } = selectedService || {};
  let emptyApiData = isEmpty(booking);

  const { year = "", month = "", date = "" } = props.match.params;
  const [selectedDate, setSelectedDate] = useState(moment());
  
  const updateBooking = useCallback(() => {
    if(!selectedService) return;
    let _selectedDate = moment()
      .set({ year, month })
      .subtract(1, 'month')
      .set({ date });
    setSelectedDate(_selectedDate);
    getBookingsByDate(selectedService.id, _selectedDate.format());
  }, [year, month, date, selectedService, getBookingsByDate]);

  useEffect(() => {
    updateBooking();
  }, [year, month, date, updateBooking])

  if (emptyApiData) booking.timeslots = cloneDeep(timeslots);

  const onCloseCalendar = () => {
    history.push(`/${selectedService.id}/calendar/${year}/${month}`);
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
  const initiateBooking = async event => {
    if (!isSignedIn) {
      userErrorMessage();
      return;
    };
    console.log(event.target.dataset)
    let id = event.target.dataset.label;
    const issuedTimeslot = booking.timeslots.find(({ _id }) => _id === id);
    issuedTimeslot.userid = user._id;
    issuedTimeslot.username = user.lastname;
    booking.date = emptyApiData ? selectedDate : booking.date;
    booking.service = selectedService.id;
    emptyApiData ? await createBooking(booking) : await patchBooking(booking);
    userSuccessMessage('Din bokning har registrerats.')
    updateBooking();
    
  }

  const initiateDeleteBooking = event => {
    let id = event.target.dataset.label;
    const issuedTimeslot = booking.timeslots.find(({ _id }) => _id === id);
    issuedTimeslot.userid = null;
    issuedTimeslot.username = "";
    patchBooking(booking).then(() => {
      userSuccessMessage('Din bokning har avregistrerats.')
      updateBooking();
    });
  }

  const renderTimeSlots = () => {
    const { timeslots } = booking;
    return (
      timeslots.map((slot, i) => {
        const className = slot => {
          if (!isSignedIn) return 'button small ui red disabled';
          else if (slot.userid && slot.userid !== user._id) return 'button small ui red disabled';
          else return 'button small ui teal selectable';
        }
        return (
          <div key={i} className="two column row">
            <div className="column" key={slot.timeslot} >
              <button className={className(slot)} data-label={slot._id} onClick={slot.userid ? initiateDeleteBooking : initiateBooking}>{slot.timeslot}</button>
            </div>
            <div className="column" key={slot._id} data-label={slot.userid ? slot.userid : ''}>
              {slot.userid && (
                <div className="ui label">
                  <i className="check icon teal"></i>
                  { slot.username || 'Bokad av okänd användare' }
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
    history.push(`/${selectedService.id}/calendar/${dObject.format('YYYY')}/${dObject.format('MM')}/${dObject.format('DD')}`);
  }
  return (
    <>
      <Container>
        <InfoBar title="Kalenderdag" />
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
        {isFetching ?
          (<div style={{ height: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="ui active centered inline loader" ></div>
          </div>) :
          (<React.Fragment>
            <div className="ui celled grid">
              <div className="two column row">
                <div className="column">Tider</div>
                <div className="column">Bokad av</div>
              </div>
            </div>
            <div className="ui celled grid">
              {booking.timeslots && renderTimeSlots()}
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <div className="ui teal button" onClick={() => onCloseCalendar()} > Tillbaka till kalendermånad</div>
              </div>
            </div>
          </React.Fragment>)}
      </Container>
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    selectedDate: state.calendar.selectedDate,
    auth: state.auth,
    userProfile: state.auth.userProfile,
    bookingData: state.bookingData,
    isFetching: state.isFetching,
    selectedService: state.service.selectedService
  })

}
export default connect(mapStateToProps, {
  setSelectedDate,
  createBooking,
  patchBooking,
  getBookingsByDate,
  newMessage,
})(CalendarDay);