import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history';
import LoginForm from '../components/LoginForm';
import { login } from '../actions';
import InfoBar from '../components/InfoBar';

const Login = props => {
  const {
    login,
    auth: {
      isSignedIn
    },
  } = props;
  useEffect(() => {
    if (isSignedIn) {
      history.push('/');
    }
  }, [isSignedIn]);
  const onSubmit = ({ username, password }) => {
    login(username, password);
  }
  return (
      <div className="page-container">
        <InfoBar title="Login" />
        <div>
          <LoginForm onSubmit={onSubmit} />
      </div>
      <div className="ui divider"></div>
        <div className="button-group extra">
          <Link className="" to="/user/forgot-password">Glömt lösenord?</Link>
          <Link className="" to="/user/create">Ny användare</Link>
        </div>
      <div className="ui divider"></div>
      </div>)
}
const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}
export default connect(mapStateToProps, { login })(Login);