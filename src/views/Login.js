import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login } from '../actions';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import { toggleSidebar } from '../actions';

const Login = props => {
  const { login, toggleSidebar } = props;

  const onSubmit = ({ username, password }) => {
    login(username, password);
  }
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <Icon name="bars" size="large" onClick={toggleSidebar}></Icon>
        <h3>Login</h3>
        <div>
          <LoginForm onSubmit={onSubmit} />
        </div>
        <div className="ui horizontal divider" />
        <Link className="ui item" to="/user/create">Skapa en ny användare</Link>
      </Segment>
    </Sidebar.Pusher>);
}
const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}
export default connect(mapStateToProps, { login, toggleSidebar })(Login);