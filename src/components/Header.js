import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toggleSidebar } from '../actions';
import Auth from './Auth';
import { Sidebar, Menu, Segment, Icon } from 'semantic-ui-react';

const Header = props => {
  const { showSidebar, toggleSidebar } = props;
  const __currentDate = moment();
  return (
    // <div className="ui borderless huge menu" style={{ flexGrow: 1 }}>
    //   <div className="ui container">
    //     <div className="computer tablet only row">
    //       <div className="ui secondary menu" style={{ flexGrow: 1 }}>
    //         <a className="item" href="/">
    //           <i className="calendar alternate outline icon large" />
    //         </a>
    //         <a className="item" href={`/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`}>Kalender</a>
    //         <a className="item" href="/bookings">Mina bokningar</a>
    //         <div className="item">
    //           <Auth />
    //         </div>
    //       </div>
    //     </div>
    //     {/* End computer only */}
    //     <div className="mobile only row">
    <React.Fragment>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        // onHide={() => toggleSidebar()}
        vertical
        visible={showSidebar}
        width="thin">
        <Menu.Item
          as="a"
          href="/">
          <Icon name="home"></Icon>
                  Hem
              </Menu.Item>
        <Menu.Item
          as="a"
          href={`/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`}>
          <Icon name="calendar"></Icon>
                  Kalender
              </Menu.Item>
        <Menu.Item
          as="a"
          href="/bookings">
          <Icon name="user"></Icon>
                  Mina bokningar
              </Menu.Item>
      </Sidebar>
      {/* <Sidebar.Pusher>
        <Segment basic>
          <Icon name="bars" onClick={() => toggleDropDown()}></Icon>
        </Segment>
      </Sidebar.Pusher> */}
    </React.Fragment>
    // </div>
  )
}
const mapStateToProps = state => {
  return ({
    showSidebar: state.application.showSidebar
  })
}
export default connect(mapStateToProps, { toggleSidebar })(Header);