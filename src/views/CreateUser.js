import React from 'react';
import { connect } from 'react-redux';
import CreateUserForm from '../components/CreateUserForm';
import { createUser } from '../actions';

const CreateUser = props => {
  const { createUser } = props;

  const onSubmit = formValues => {
    createUser(formValues).then(user => console.log(user)).catch(err => {
      console.log(err);
    });
  }
  return (<div>
    <h3>Skapa ny användare</h3>
    <CreateUserForm onSubmit={onSubmit} />

  </div>);
};
const mapStateToProps = (state) => {
  return ({
    user: state.user
  })
}
export default connect(mapStateToProps, { createUser })(CreateUser);