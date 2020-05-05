import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
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
      <Field name="password" component={renderInput} label="Lösenord:" type="password"></Field>
      <button className="ui button primary" type="submit">Login</button>
    </form>
  )
}
const validate = formValues => {
  const errors = {};
  if (!formValues.username) errors.username = 'Du måste fylla i ett användarnamn';
  if (!formValues.password) errors.password = 'Du måste fylla i ditt lösenord';
  return errors;
}

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);