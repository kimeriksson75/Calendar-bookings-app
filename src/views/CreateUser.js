import React from 'react';
import { connect } from 'react-redux';
import CreateUserForm from '../components/CreateUserForm';
import { createUser } from '../actions';
import { Sidebar, Segment } from 'semantic-ui-react';
import PusherHeader from '../components/PusherHeader';
const CreateUser = props => {
  const { createUser } = props;

  const onSubmit = formValues => {
    createUser(formValues);
  }
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <PusherHeader title="Skapa ny användare" subTitle="" />
        <CreateUserForm onSubmit={onSubmit} />
      </Segment>
    </Sidebar.Pusher >);
};
const mapStateToProps = (state) => {
  return ({
    user: state.user
  })
}
export default connect(mapStateToProps, { createUser })(CreateUser);