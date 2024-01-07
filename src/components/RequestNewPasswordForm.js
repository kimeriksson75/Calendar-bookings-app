import React, { useState, useEffect } from 'react';
import resetPasswordSchema from '../utils/validation/reset-password-form-schema';

const RequestPasswordForm = props => {
  const {
    onSubmit,
  } = props;

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isValidForm = () => {
    setErrors({});
    const validationResult = resetPasswordSchema.validate(inputs, { abortEarly: false });
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
    onSubmit(inputs);
  }

  const isSubmitDisabled = () => {
    return Object.keys(errors).length > 0 || Object.keys(inputs).length < 1;
  }

  return (
    <form data-testid="forgot-password-form" onSubmit={onHandleSubmit} className="ui form error">
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
      <div className="button-group">
        <button data-testid="btn-submit" className="button button--primary" type="submit" disabled={isSubmitDisabled()}>Skicka</button>
        <button data-testid="btn-clear" className="button button--secondary" onClick={onHandleClear}>Rensa</button>
      </div>
    </form>
  )
}


export default RequestPasswordForm;