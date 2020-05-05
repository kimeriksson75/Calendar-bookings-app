import React from 'react';
import { Field, reduxForm } from 'redux-form';

const CreateUserForm = props => {
  const { handleSubmit } = props;

  const onSubmit = formValues => {
    props.onSubmit(formValues);
  }

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="">
            <p>{error}</p>
          </div>
        </div>
      )
    }
  }
  const renderInput = ({ input, label, type, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="on" />
        {renderError(meta)}
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
      <Field name="username" component={renderInput} label="Användarnamn:" type="text"></Field>
      <Field name="firstname" component={renderInput} label="Namn:" type="text"></Field>
      <Field name="lastname" component={renderInput} label="Efternamn:" type="text"></Field>
      <Field name="password" component={renderInput} label="Lösenord:" type="password"></Field>
      <Field name="apartmentid" component={renderInput} label="Lägenhetsnummer:" type="text"></Field>
      <button className="ui button primary" type="submit">Skicka in</button>
    </form>
  )
}
const validate = formValues => {
  const errors = {};
  if (!formValues.username) errors.username = 'Du måste fylla i ett användarnamn';
  if (!formValues.firstname) errors.firstname = 'Du måste fylla i ditt namn';
  if (!formValues.lastname) errors.lastname = 'Du måste fylla i ditt efternamn';
  if (!formValues.password) errors.password = 'Du måste fylla i ett lösenord';
  if (!formValues.apartmentid) errors.apartmentid = 'Du måste fylla i ditt lägenhetsnummer';
  return errors;
}

export default reduxForm({
  form: 'createUserForm',
  validate
})(CreateUserForm)