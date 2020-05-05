import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Auth from './Auth';
// import GoogleAuth from './GoogleAuth'; 

const Header = props => {
  const __currentDate = moment();
  return (
    <div className="ui secondary menu">
      <Link className="item" to="/">
        <i className="calendar alternate outline icon large" />
      </Link>
      <Link className="item" to={`/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`}>Kalender</Link>
      <Link className="item" to="/bookings">Mina bokningar</Link>
      <Auth />
    </div>
  )
}
export default Header;