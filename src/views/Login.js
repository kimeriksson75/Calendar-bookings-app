import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login } from '../actions';

const Login = props => {
  const { login } = props;

  const onSubmit = ({ username, password }) => {
    login(username, password)
  }
  return (
    <div className="ui container">
      <h3>Login</h3>
      <div>
        <LoginForm onSubmit={onSubmit} />
      </div>
      <div className="ui horizontal divider" />
      <Link className="ui item " to="/user/create">Skapa en ny användare</Link>
    </div>);
}
const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}
export default connect(mapStateToProps, { login })(Login);