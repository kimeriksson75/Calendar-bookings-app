import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { omit } from 'lodash-fp';
import { getAvailableResidences, getAvailableApartments } from '../actions'

const validate = formValues => {
  const errors = {};
  if (!formValues.username) errors.username = 'Du måste fylla i ett användarnamn';
  if (!formValues.firstname) errors.firstname = 'Du måste fylla i ditt namn';
  if (!formValues.lastname) errors.lastname = 'Du måste fylla i ditt efternamn';
  if (!formValues.password) errors.password = 'Du måste fylla i ett lösenord';
  if (!formValues.repeatpassword) errors.repeatpassword = 'Du måste fylla i ditt lösenord ditt lösenord igen';
  if (formValues.repeatpassword !== formValues.password) errors.repeatpassword = 'Det upprepade lösenordet stämmer inte med lösenordet';
  if (!formValues.residence) errors.residence = 'Du måste välja ett bostadshus';
  if (!formValues.apartment) errors.apartment = 'Du måste fylla i ditt lägenhetsnummer';
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

const renderSelect = ({
  input,
  type,
  label,
  defaultOption,
  options,
  autoComplete,
  meta,
  meta: { error, touched } }) => {
  const className = `field ${error && touched ? 'error' : ''}`;

  return (
    <div className={className}>
      <label>{label}</label>
      <select className=""
        {...input}
        type={type}
        autoComplete={autoComplete}>
        <option value="">{defaultOption}</option>{options && options.map(option =>
          <option value={option.id} key={option.id}>{option.name}</option>)}
      </select>
      {renderError(meta)}
    </div>)
};

let CreateUserForm = props => {
  const {
    handleSubmit,
    reset,
    pristine,
    submitting,
    getAvailableResidences,
    getAvailableApartments,
    residences: { residences = [] },
    residence = null,
    apartments: { apartments = [] }
  } = props;

  useEffect(() => {
    getAvailableResidences();
    residence && getAvailableApartments(residence);
  }, [getAvailableResidences, residence, getAvailableApartments]);


  const onSubmit = formValues => {
    const reducedFormValues = omit('repeatpassword', formValues);
    props.onSubmit(reducedFormValues);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
      <Field name="username" component={renderInput} label="Användarnamn:" type="text" autoComplete="username"></Field>
      <Field name="email" component={renderInput} label="Email:" type="email" autoComplete="email"></Field>
      <Field name="firstname" component={renderInput} label="Namn:" type="text" autoComplete="firstname"></Field>
      <Field name="lastname" component={renderInput} label="Efternamn:" type="text" autoComplete="lastname"></Field>
      <Field name="password" component={renderInput} label="Lösenord:" type="password" autoComplete="password"></Field>
      <Field name="repeatpassword" component={renderInput} label="Upprepa lösenord:" type="password" autoComplete="password"></Field>
      <Field name="residence" component={renderSelect} label="Bostadshus:" defaultOption="Välj bostadshus" options={residences} type="select" autoComplete="residence"></Field>
      <Field name="apartment" component={renderSelect} label="Lägenhetsnummer:" defaultOption="Välj lägenhetsnummer" options={apartments} type="text" autoComplete="apartment"></Field>
      <button className="ui button primary" disabled={pristine} loading={submitting.toString()} type="submit">Skicka in</button>
      <button className="ui button secondary" disabled={pristine || submitting} onClick={reset}>Rensa</button>
    </form>
  )
}


CreateUserForm = reduxForm({
  form: 'createUserForm',
  validate,
  enableReinitialize: true,
  asyncBlurFields: [],
})(CreateUserForm);

const selector = formValueSelector('createUserForm')
const mapStateToProps = state => {
  return ({
    residences: state.residences,
    residence: selector(state, 'residence'),
    apartments: state.apartments
  })
}
CreateUserForm = connect(mapStateToProps, { getAvailableResidences, getAvailableApartments })(CreateUserForm)

export default CreateUserForm;