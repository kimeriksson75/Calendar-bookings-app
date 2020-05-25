import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login } from '../actions';
import { Sidebar, Segment } from 'semantic-ui-react';
import PusherHeader from '../components/PusherHeader';

const Login = props => {
  const { login } = props;

  const onSubmit = ({ username, password }) => {
    login(username, password);
  }
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <PusherHeader title="Login" subTitle="" />
        <div>
          <LoginForm onSubmit={onSubmit} />
        </div>
        <div className="extra" style={{ paddingTop: '12px' }}>
          <Link className="" to="/user/create">Eller skapa en ny användare</Link>
        </div>
      </Segment>
    </Sidebar.Pusher>);
}
const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}
export default connect(mapStateToProps, { login })(Login);