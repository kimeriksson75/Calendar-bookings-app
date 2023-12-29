import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash-fp';
import { getAvailableResidences } from '../actions'
import createFormSchema from '../utils/validation/create-form-schema';

let CreateUserForm = props => {
  const {
    onSubmit,
    residenceParam,
    getAvailableResidences,
    residences: { residences = [] },
    residence = null,
  } = props;

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAvailableResidences();
  }, [getAvailableResidences, residence]);

  const onHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    
  }

  const onHandleClear = event => {
    event.preventDefault();
    setInputs({});
    setErrors({});    
  }

  const onHandleSubmit = event => {
    event.preventDefault();
    setErrors({});
    const validationResult = createFormSchema.validate(inputs, { abortEarly: false });
    if (validationResult.error) {
      validationResult.error?.details?.map(err => setErrors(errors => ({...errors, [err.path[0]]: err.message})));
      return
    }
    const reducedFormValues = omit('repeatpassword', inputs);
    onSubmit({ ...reducedFormValues, residence: residenceParam});
  }
  return (
    <form onSubmit={onHandleSubmit} className="ui form">
      <label htmlFor="username">Användarnamn:</label>
      <input
        className={`input ${errors.username ? "error" : ""}`}
        onChange={onHandleChange} 
        name="username"
        id="username"
        data-testid="username"
        label="Användarnamn:"
        type="text" />
      <div className="form error-message">
        {errors.username ? errors.username : null}
      </div>
      <label htmlFor="email">Email:</label>
      <input
        className={`input ${errors.username ? "error" : ""}`}
        onChange={onHandleChange} 
        name="email"
        id="email"
        data-testid="email"
        label="Email:"
        type="email" />
      <div className="form error-message">
        {errors.email ? errors.email : null}
      </div>
      <label htmlFor="firstname">Namn:</label>
      <input
        className={`input ${errors.username ? "error" : ""}`}
        onChange={onHandleChange} 
        name="firstname"
        id="firstname"
        data-testid="firstname"
        label="Namn:"
        type="text" />
      <div className="form error-message">
        {errors.firstname ? errors.firstname : null}
      </div>
      <label htmlFor="lastname">Efternamn:</label>
      <input
        className={`input ${errors.username ? "error" : ""}`}
        onChange={onHandleChange} 
        name="lastname"
        id="lastname"
        data-testid="lastname"
        label="Efternamn:"
        type="text" />
      <div className="form error-message">
        {errors.lastname ? errors.lastname : null}
      </div>
      <label htmlFor="password">Lösenord:</label>
      <input
        className={`input ${errors.username ? "error" : ""}`}
        onChange={onHandleChange} 
        name="password"
        id="password"
        data-testid="password"
        label="Lösenord:"
        type="password" />
      <div className="form error-message">
        {errors.password ? errors.password : null}
      </div>
      <label htmlFor="repeatpassword">Upprepa lösenord:</label>
      <input
        className={`input ${errors.username ? "error" : ""}`}
        onChange={onHandleChange} 
        name="repeatpassword"
        id="repeatpassword"
        data-testid="repeatpassword"
        label="Upprepa lösenord:"
        type="password" />
      <div className="form error-message">
        {errors.repeatpassword ? errors.repeatpassword : null}
      </div>
      <div className="button-group">
        <button data-testid="btn-submit" className="button button--primary" type="submit">Skicka in</button>
        <button data-testid="btn-clear" className="button button--secondary" onClick={onHandleClear}>Rensa</button>
      </div>
    </form>
  )
}


const mapStateToProps = state => {
  return ({
    residences: state.residences,
    apartments: state.apartments
  })
}
CreateUserForm = connect(mapStateToProps, { getAvailableResidences })(CreateUserForm)

export default CreateUserForm;