import React from 'react';
import { connect } from 'react-redux';
import CreateUserForm from '../components/CreateUserForm';
import { createUser, toggleSidebar } from '../actions';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import PusherHeader from '../components/PusherHeader';
const CreateUser = props => {
  const { createUser, toggleSidebar } = props;

  const onSubmit = formValues => {
    createUser(formValues).then(user => console.log(user)).catch(err => {
      console.log(err);
    });
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
export default connect(mapStateToProps, { createUser, toggleSidebar })(CreateUser);