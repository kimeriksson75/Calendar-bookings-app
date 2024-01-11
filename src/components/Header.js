import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toggleSidebar, logout, unsetSelectedService, setLayout } from '../actions';
import history from '../history';

const Header = props => {
  const {
    showSidebar,
    toggleSidebar,
    layout,
    setLayout,
    logout,
    unsetSelectedService,
    auth,
    service: { selectedService = null },
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

  const onToggleLayout = () => {
    if (layout === 'dark') {
      setLayout('light');
    } else {
      setLayout('dark');
    }
    toggleSidebar(false);
  }

  useEffect(() => {
    if (layout === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  },[layout])
  const onMenuItemClick = async url => {
    toggleSidebar(false);
    delayedNav(url);
  }

  return (
    <>
      <header data-testid="header" className="app-header">
          <button className="logo" aria-label="logo" onClick={() => onMenuItemClick('/')}><i className="large calendar centered outline icon"></i></button>
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
                  onClick={() => onMenuItemClick(`/${selectedService.id}/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}/${__currentDate.format('D')}`)}>
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
                <button onClick={() => onMenuItemClick(`/user/create/${auth?.user?.residence}`)}>
                  Ny användare
                </button>
              </li>
              <li>
                <button onClick={() => onToggleLayout()}>
                  {!layout || layout === 'light' ? 'Tema - Mörk' : 'Tema - Ljus'}
                </button>
              </li>
            </ul>
        </nav>
      </header>
      <div className="ui divider" style={{marginTop: '0px'}}></div>
    </>)
}
const mapStateToProps = state => {
  return ({
    showSidebar: state.application.showSidebar,
    layout: state.application.layout,
    auth: state.auth,
    service: state.service,
  })
}
export default connect(mapStateToProps, { toggleSidebar, logout, unsetSelectedService, setLayout })(Header);