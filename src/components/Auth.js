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
        (<div className="ui item" onClick={() => onLogout()}>{`Logga ut ${user.firstname}`} </div>) :
        (<Link className="ui item" to="/user/login">Logga in</Link>)
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