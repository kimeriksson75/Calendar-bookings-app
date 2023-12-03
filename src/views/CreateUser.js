import React from 'react';
import { connect } from 'react-redux';
import CreateUserForm from '../components/CreateUserForm';
import { createUser } from '../actions';
import InfoBar from '../components/InfoBar';
const CreateUser = props => {
  const { createUser } = props;

  const onSubmit = formValues => {
    createUser(formValues);
  }
  return (
    <>
      <div className="page-container">
        <InfoBar title="Ny användare" />
        <CreateUserForm onSubmit={onSubmit} />
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return ({
    user: state.user
  })
}
export default connect(mapStateToProps, { createUser })(CreateUser);