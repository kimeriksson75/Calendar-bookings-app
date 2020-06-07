import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { omit } from 'lodash-fp';

const validate = formValues => {
  const errors = {};
  if (!formValues.username) errors.username = 'Du måste fylla i ett användarnamn';
  if (!formValues.firstname) errors.firstname = 'Du måste fylla i ditt namn';
  if (!formValues.lastname) errors.lastname = 'Du måste fylla i ditt efternamn';
  if (!formValues.password) errors.password = 'Du måste fylla i ett lösenord';
  if (!formValues.repeatpassword) errors.repeatpassword = 'Du måste fylla i ditt lösenord ditt lösenord igen';
  if (formValues.repeatpassword !== formValues.password) errors.repeatpassword = 'Det upprepade lösenordet stämmer inte med lösenordet';
  if (!formValues.apartmentid) errors.apartmentid = 'Du måste fylla i ditt lägenhetsnummer';
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
const renderInput = ({
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
      <input {...input} type={type} placeholder={label} autoComplete={autoComplete} />
      {renderError(meta)}
    </div>
  )
}

const CreateUserForm = props => {
  const { handleSubmit, reset, pristine, submitting } = props;

  const onSubmit = formValues => {
    const reducedFormValues = omit('repeatpassword', formValues);
    props.onSubmit(reducedFormValues);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
      <Field name="username" component={renderInput} label="Användarnamn:" type="text" autoComplete="username"></Field>
      <Field name="firstname" component={renderInput} label="Namn:" type="text" autoComplete="firstname"></Field>
      <Field name="lastname" component={renderInput} label="Efternamn:" type="text" autoComplete="lastname"></Field>
      <Field name="password" component={renderInput} label="Lösenord:" type="password" autoComplete="password"></Field>
      <Field name="repeatpassword" component={renderInput} label="Upprepa lösenord:" type="password" autoComplete="password"></Field>
      <Field name="apartmentid" component={renderInput} label="Lägenhetsnummer:" type="text" autoComplete="id"></Field>
      <button className="ui button primary" disabled={pristine} loading={submitting.toString()} type="submit">Skicka in</button>
      <button className="ui button secondary" disabled={pristine || submitting} onClick={reset}>Rensa</button>
    </form>
  )
}


export default reduxForm({
  form: 'createUserForm',
  validate,
  enableReinitialize: true,
  asyncBlurFields: [],
})(CreateUserForm)