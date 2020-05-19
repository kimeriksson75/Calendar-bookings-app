import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { Menu, Icon } from 'semantic-ui-react';

const Auth = props => {
  const { isSignedIn, user } = props.auth;
  const { logout } = props;

  const onLogout = () => {
    logout();
  }
  return (
    <Menu.Item
      as="a"
      href={isSignedIn ? "/" : "/user/login"}>
      <Icon name={isSignedIn ? "sign-out" : "sign-in"} size="small"></Icon>
      {isSignedIn ?
        (<div onClick={() => onLogout()}>{`Logga ut ${user.firstname}`} </div>) :
        (<div>Logga in</div>)
      }
    </Menu.Item >
  )
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}

export default connect(mapStateToProps, { logout })(Auth);