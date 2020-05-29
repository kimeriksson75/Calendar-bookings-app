import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toggleSidebar, logout, unsetSelectedService } from '../actions';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import history from '../history';

const Header = props => {
  const {
    showSidebar,
    toggleSidebar,
    logout,
    unsetSelectedService,
    auth,
    service: { selectedService = null }
  } = props;

  const [url, setUrl] = useState(null);
  const [shouldLogout, setShouldLogout] = useState(false);
  const __currentDate = moment();

  const delayedNav = () => {
    url && history.push(url);
    if (shouldLogout) {
      logout();
      unsetSelectedService();
    }
    setShouldLogout(false);
    setUrl(null)
  }
  const onMenuItemClick = url => {
    setUrl(url)
    toggleSidebar(false);
  }

  return (
    <React.Fragment>
      <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        icon="labeled"
        onHide={() => toggleSidebar(false)}
        onHidden={() => delayedNav()}
        vertical

        visible={showSidebar}
        width="thin"
        size="tiny">
        <Menu.Item
          onClick={() => onMenuItemClick('/')}>
          <Icon name="home" size="small"></Icon>
            Hem
          </Menu.Item>
        <Menu.Item
          disabled={!auth.isSignedIn || !selectedService}
          onClick={() => { onMenuItemClick(`/${selectedService.id}/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`) }}>
          <Icon name="calendar alternate outline" size="small"></Icon>
            Kalender
          </Menu.Item>
        <Menu.Item
          disabled={!auth.isSignedIn || !selectedService}
          onClick={() => onMenuItemClick(`/${selectedService.id}/bookings`)}>
          <Icon name="user" size="small"></Icon>
            Mina bokningar
        </Menu.Item>
        {auth.isSignedIn ?
          (<Menu.Item
            onClick={() => {
              setShouldLogout(true)
              onMenuItemClick()
            }}>
            <Icon name="sign-out"></Icon>
            <div>{`Logga ut ${auth.user.firstname}`}</div>
          </Menu.Item>) :
          (<Menu.Item
            onClick={() => onMenuItemClick('/user/login')}>
            <Icon name="sign-in"></Icon>
            <div>Logga in</div>
          </Menu.Item >)}
        <Menu.Item
          onClick={() => onMenuItemClick('/user/create')}>
          <Icon name="plus" size="small"></Icon>
            Ny användare
        </Menu.Item>
      </Sidebar >
    </React.Fragment >
  )
}
const mapStateToProps = state => {
  return ({
    showSidebar: state.application.showSidebar,
    auth: state.auth,
    service: state.service
  })
}
export default connect(mapStateToProps, { toggleSidebar, logout, unsetSelectedService })(Header);