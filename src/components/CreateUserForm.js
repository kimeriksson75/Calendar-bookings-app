import React, { useState, useEffect } from 'react';
import { omit } from 'lodash-fp';
import createFormSchema from '../utils/validation/create-form-schema';

let CreateUserForm = props => {
  const {
    onSubmit,
  } = props;

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isValidForm = () => {
    setErrors({});
    const validationResult = createFormSchema.validate(inputs, { abortEarly: false });
    if (validationResult.error) {
      validationResult.error?.details?.map(err => setErrors(errors => ({...errors, [err.path[0]]: err.message})));
      return false;
    }
    return true;
  }
  useEffect(() => {
    if (hasSubmitted) {
      isValidForm();
    }
  }, [inputs]);

  const onHandleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    await setInputs(values => ({ ...values, [name]: value }));
    
  }

  const onHandleClear = event => {
    event.preventDefault();
    setInputs({});
    setErrors({});    
  }

  const onHandleSubmit = event => {
    event.preventDefault();
    setHasSubmitted(true);
    if (!isValidForm()) {
      return
    }
    const reducedFormValues = omit('repeatpassword', inputs);
    onSubmit(reducedFormValues);
  }

  const isSubmitDisabled = () => {
    return Object.keys(errors).length > 0 || Object.keys(inputs).length < 6;
  }

  return (
    <form data-testid="create-user-form" onSubmit={onHandleSubmit} className="ui form">
      <label htmlFor="username">Användarnamn:</label>
      <input
        className={`input ${errors.username ? "error" : ""}`}
        onChange={onHandleChange} 
        name="username"
        id="username"
        data-testid="username"
        label="Användarnamn:"
        value={inputs.username || ""} 
        type="text" />
      <div className="form error-message">
        {errors.username ? errors.username : null}
      </div>
      <label htmlFor="email">Email:</label>
      <input
        className={`input ${errors.email ? "error" : ""}`}
        onChange={onHandleChange} 
        name="email"
        id="email"
        data-testid="email"
        label="Email:"
        value={inputs.email || ""} 
        type="email" />
      <div className="form error-message">
        {errors.email ? errors.email : null}
      </div>
      <label htmlFor="firstname">Namn:</label>
      <input
        className={`input ${errors.firstname ? "error" : ""}`}
        onChange={onHandleChange} 
        name="firstname"
        id="firstname"
        data-testid="firstname"
        label="Namn:"
        value={inputs.firstname || ""} 
        type="text" />
      <div className="form error-message">
        {errors.firstname ? errors.firstname : null}
      </div>
      <label htmlFor="lastname">Efternamn:</label>
      <input
        className={`input ${errors.lastname ? "error" : ""}`}
        onChange={onHandleChange} 
        name="lastname"
        id="lastname"
        data-testid="lastname"
        label="Efternamn:"
        value={inputs.lastname || ""} 
        type="text" />
      <div className="form error-message">
        {errors.lastname ? errors.lastname : null}
      </div>
      <label htmlFor="password">Lösenord:</label>
      <input
        className={`input ${errors.password ? "error" : ""}`}
        onChange={onHandleChange} 
        name="password"
        id="password"
        data-testid="password"
        label="Lösenord:"
        value={inputs.password || ""} 
        type="password" />
      <div className="form error-message">
        {errors.password ? errors.password : null}
      </div>
      <label htmlFor="repeatpassword">Upprepa lösenord:</label>
      <input
        className={`input ${errors.repeatpassword ? "error" : ""}`}
        onChange={onHandleChange} 
        name="repeatpassword"
        id="repeatpassword"
        data-testid="repeat"
        label="Upprepa lösenord:"
        value={inputs.repeatpassword || ""} 
        type="password" />
      <div className="form error-message">
        {errors.repeatpassword ? errors.repeatpassword : null}
      </div>
      <div className="button-group">
        <button data-testid="btn-submit" className="button button--primary" type="submit" disabled={isSubmitDisabled()}>Skicka in</button>
        <button data-testid="btn-clear" className="button button--secondary" onClick={onHandleClear}>Rensa</button>
      </div>
    </form>
  )
}

export default CreateUserForm;