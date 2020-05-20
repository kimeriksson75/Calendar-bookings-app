import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toggleSidebar } from '../actions';
import Auth from './Auth';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

const Header = props => {
  const { showSidebar, toggleSidebar } = props;
  const __currentDate = moment();
  return (
    <React.Fragment>
      <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        icon="labeled"
        onHide={() => toggleSidebar(false)}
        vertical
        inverted
        visible={showSidebar}
        width="thin"
        size="tiny">
        <Menu.Item
          as="a"
          href="/">
          <Icon name="home" size="small"></Icon>
            Hem
          </Menu.Item>
        <Menu.Item
          as="a"
          href={`/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`}>
          <Icon name="calendar alternate outline" size="small"></Icon>
            Kalender
          </Menu.Item>
        <Menu.Item
          as="a"
          href="/bookings">
          <Icon name="user" size="small"></Icon>
            Mina bokningar
        </Menu.Item>
        <Auth />
        <Menu.Item
          as="a"
          href="/user/create">
          <Icon name="plus" size="small"></Icon>
            Ny användare
        </Menu.Item>
      </Sidebar>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return ({
    showSidebar: state.application.showSidebar
  })
}
export default connect(mapStateToProps, { toggleSidebar })(Header);