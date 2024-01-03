import React from 'react';
import { connect } from 'react-redux';
import CreateUserForm from '../components/CreateUserForm';
import { createUser } from '../actions';
import InfoBar from '../components/InfoBar';
const CreateUser = props => {
  const { createUser } = props;
  const { residenceId = ""} = props.match.params;


  const onSubmit = formValues => {
    createUser({ ...formValues, residence: residenceId });
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

export default connect(null, { createUser })(CreateUser);