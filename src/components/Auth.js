import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions';

const Auth = props => {
  const { isSignedIn, user } = props.auth;
  const { logout } = props;

  const onLogout = () => {
    logout();
  }
  return (
    <React.Fragment>
      {isSignedIn ?
        (<button className="ui item negative basic button" onClick={() => onLogout()}>{`Logout ${user.username}`} </button>) :
        (<Link className="ui item" to="/user/login">Login</Link>)
      }
    </React.Fragment >
  )
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}

export default connect(mapStateToProps, { logout })(Auth);