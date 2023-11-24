import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toggleSidebar, logout, unsetSelectedService } from '../actions';
import history from '../history';
import '../styles/main.scss';

const Header = props => {
  const {
    showSidebar,
    toggleSidebar,
    logout,
    unsetSelectedService,
    auth,
    service: { selectedService = null }
  } = props;

  const __currentDate = moment();

  const delayedNav = (url) => {
    url && history.push(url);
  }
  
  const onLogOut = () => {
    logout({
      refreshToken: auth?.user?.refreshToken,
      accessToken: auth?.user?.accessToken
    });
    unsetSelectedService();
    toggleSidebar(false);
    history.push('/user/logout')
  }
  const onMenuItemClick = async url => {
    toggleSidebar(false);
    delayedNav(url);
  }

  return (
    <>
      <header className="app-header">
          <a href="/" className="logo"><i className="large calendar centered outline icon"></i></a>
        <input
          className="side-menu"
          type="checkbox"
          checked={showSidebar}
          onChange={(e) => e.target.checked ? toggleSidebar(true) : toggleSidebar(false)} id="side-menu" />
          <label className="hamb" htmlFor="side-menu">
            <span className="hamb-line"></span>
          </label>
          <nav className={`nav ${showSidebar ? 'nav-open' : ''}`}>
            <ul className="menu">
              <li>
                <button onClick={() => onMenuItemClick('/')}>Hem</button>
              </li>
              <li>
                <button
                  disabled={!auth.isSignedIn || !selectedService}
                  onClick={() => onMenuItemClick(`/${selectedService.id}/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`)}>
                  Kalender
                </button>
              </li>
              <li>
                <button
                  disabled={!auth.isSignedIn || !selectedService}
                  onClick={() => onMenuItemClick(`/${selectedService.id}/bookings`)}>
                  Mina bokningar
                </button>
              </li>
              <li>
                {auth.isSignedIn ?
                  (<button onClick={() => {
                    onLogOut()
                  }}>
                    {`Logga ut ${auth?.user?.firstname}`}
                  </button>)
                  :
                  (<button onClick={() => 
                    onMenuItemClick('/user/login')
                  }>
                    Logga in
                  </button>)}</li>
              <li>
                <button onClick={() => onMenuItemClick('/user/create')}>
                  Ny användare
                </button>
              </li>
            </ul>
          </nav>
      </header>
    </>)
}
const mapStateToProps = state => {
  return ({
    showSidebar: state.application.showSidebar,
    auth: state.auth,
    service: state.service
  })
}
export default connect(mapStateToProps, { toggleSidebar, logout, unsetSelectedService })(Header);