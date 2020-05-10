import React, { useState } from 'react';
import moment from 'moment';
import Auth from './Auth';
// import GoogleAuth from './GoogleAuth'; 

const Header = props => {
  const [dropDownClass, setDropDownClass] = useState('none');
  const toggleDropDown = () => {
    dropDownClass === 'block' ? setDropDownClass('none') : setDropDownClass('block');
  }
  const __currentDate = moment();
  return (
    <div className="ui borderless huge menu" style={{ flexGrow: 1 }}>
      <div className="ui container grid">
        <div className="computer tablet only row">
          <div className="ui secondary menu" style={{ flexGrow: 1 }}>
            <a className="item" href="/">
              <i className="calendar alternate outline icon large" />
            </a>
            <a className="item" href={`/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`}>Kalender</a>
            <a className="item" href="/bookings">Mina bokningar</a>
            <div className="item">
              <Auth />
            </div>
          </div>
        </div>
        {/* End computer only */}
        <div className="mobile only row">
          <a className="item" href="/">
            <i className="calendar alternate outline icon large" />
          </a>
          <div className="right menu">
            <div className="menu item">
              <div className="ui basic icon toggle button" onClick={() => toggleDropDown()}>
                <i className="bars icon"></i>
              </div>
            </div>
          </div>
          <div className="ui vertical accordion borderless fluid menu" style={{ display: dropDownClass }} onClick={() => toggleDropDown()}>
            <a className="item" href={`/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`}>Kalender</a>
            <a className="item" href="/bookings">Mina bokningar</a>
            <Auth />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header;