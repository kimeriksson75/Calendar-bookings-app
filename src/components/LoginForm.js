import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
  const { handleSubmit, reset, pristine, submitting } = props;

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
  const renderField = ({ input, label, autoComplete, type, meta, props }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete={autoComplete} />
        {renderError(meta)}
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
      <Field name="username" component={renderField} label="Användarnamn:" type="text" autoComplete="username"></Field>
      <Field name="password" component={renderField} label="Lösenord:" type="password" autoComplete="password"></Field>
      <button className="ui button primary" type="submit">Login</button>
      <button className="ui button secondary" disabled={pristine || submitting} onClick={reset}>Rensa</button>
    </form>
  )
}
const validate = formValues => {
  console.log('formValues', formValues)
  const errors = {};
  if (!formValues.username) errors.username = 'Du måste fylla i ett användarnamn';
  if (!formValues.password) errors.password = 'Du måste fylla i ditt lösenord';
  return errors;
}

export default reduxForm({
  form: 'loginForm',
  // fix field losing focus on first change!!
  validate,
  enableReinitialize: true,
  asyncBlurFields: [],
})(LoginForm);