import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toggleSidebar, logout, unsetSelectedService } from '../actions';
import history from '../history';
import '../styles/main.scss';

const Header = props => {
  const {
    title = "KB.",
    showSidebar,
    toggleSidebar,
    logout,
    unsetSelectedService,
    auth,
    service: { selectedService = null }
  } = props;

  const __currentDate = moment();

  const delayedNav = (url) => {
    console.log('url:', url)  

    url && history.push(url);
  }
  
  const onLogOut = () => {
    logout({
      refreshToken: auth?.user?.refreshToken,
      accessToken: auth?.user?.accessToken
    });
    unsetSelectedService();
    toggleSidebar(false);
  }
  const onMenuItemClick = async url => {
    delayedNav(url);
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
      // <Sidebar
      //   as={Menu}
      //   animation="overlay"
      //   duration={100}
      //   direction="left"
      //   icon="labeled"
      //   onHide={() => toggleSidebar(false)}
      //   onHidden={() => delayedNav()}
      //   vertical
      //   inverted
      //   color="teal"
      //   size="mini"
      //   visible={showSidebar}
      //   style={{
      //     'width': '25%'
      //   }}
      //   >
      //   <Menu.Item
      //     onClick={() => toggleSidebar(false)}>
      //     <Icon name="close" size="small"></Icon>
      //       Stäng
      //     </Menu.Item>
      //   <Menu.Item
      //     onClick={() => onMenuItemClick('/')}>
      //     <Icon name="home" size="small"></Icon>
      //       Hem
      //     </Menu.Item>
      //   <Menu.Item
      //     disabled={!auth.isSignedIn || !selectedService}
      //     onClick={() => { onMenuItemClick(`/${selectedService.id}/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}`) }}>
      //     <Icon name="calendar alternate outline" size="small"></Icon>
      //       Kalender
      //     </Menu.Item>
      //   <Menu.Item
      //     disabled={!auth.isSignedIn || !selectedService}
      //     onClick={() => onMenuItemClick(`/${selectedService.id}/bookings`)}>
      //     <Icon name="user" size="small"></Icon>
      //     {/* { auth?.user?.email &&
      //         <img
      //           alt="Gravatar"
      //           src={`https://www.gravatar.com/avatar/${auth.user.email}?d=identicon&s=24`} />
      //       } */}
      //       Mina bokningar
      //   </Menu.Item>
      //   {auth.isSignedIn ?
      //     (<Menu.Item
      //       onClick={() => {
      //         setShouldLogout(true)
      //         onMenuItemClick()
      //       }}>
      //       <Icon name="sign-out"></Icon>
      //       <div>{`Logga ut ${auth?.user?.firstname}`}</div>
      //     </Menu.Item>) :
      //     (<Menu.Item
      //       onClick={() => onMenuItemClick('/user/login')}>
      //       <Icon name="sign-in"></Icon>
      //       <div>Logga in</div>
      //     </Menu.Item >)}
      //   <Menu.Item
      //     onClick={() => onMenuItemClick('/user/create')}>
      //     <Icon name="plus" size="small"></Icon>
      //       Ny användare
      //   </Menu.Item>
      // </Sidebar >
  // )
}
const mapStateToProps = state => {
  return ({
    showSidebar: state.application.showSidebar,
    auth: state.auth,
    service: state.service
  })
}
export default connect(mapStateToProps, { toggleSidebar, logout, unsetSelectedService })(Header);