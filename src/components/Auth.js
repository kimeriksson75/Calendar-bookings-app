import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { Menu, Button, Icon } from 'semantic-ui-react';

const Auth = props => {
  const { isSignedIn, user } = props.auth;
  const { logout } = props;

  const onLogout = () => {
    logout();
  }
  return (
    <React.Fragment>
      {isSignedIn ?
        (<Menu.Item onClick={() => onLogout()}>
          <Icon name="sign-out"></Icon>
          <div>{`Logga ut ${user.firstname}`}</div>
        </Menu.Item>) :
        (<Menu.Item as="a" href="/user/login">
          <Icon name="sign-in"></Icon>
          <div>Logga in</div>
        </Menu.Item >)}
    </React.Fragment>)
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}

export default connect(mapStateToProps, { logout })(Auth);