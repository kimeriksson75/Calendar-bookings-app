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