import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = formValues => {
  const errors = {};
  if (!formValues.username) errors.username = 'Du måste fylla i ett användarnamn';
  if (!formValues.password) errors.password = 'Du måste fylla i ditt lösenord';
  return errors;
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
const renderField = ({
  input,
  label,
  autoComplete,
  type,
  meta,
  meta: { error, touched } }) => {
  const className = `field ${error && touched ? 'error' : ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} autoComplete={autoComplete} />
      {renderError(meta)}
    </div>
  )
}

const LoginForm = props => {
  const { handleSubmit, reset, pristine, submitting } = props;

  const onSubmit = formValues => {
    props.onSubmit(formValues);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
      <Field name="username" component={renderField} label="Användarnamn:" type="text" autoComplete="username"></Field>
      <Field name="password" component={renderField} label="Lösenord:" type="password" autoComplete="password"></Field>
      <button className="ui button primary" disabled={pristine} loading={submitting.toString()} type="submit">Login</button>
      <button className="ui button secondary" disabled={pristine || submitting} onClick={reset}>Rensa</button>
    </form>
  )
}


export default reduxForm({
  form: 'loginForm',
  validate,
  enableReinitialize: true,
  asyncBlurFields: [],
})(LoginForm);