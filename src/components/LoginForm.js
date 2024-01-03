import React, { useState, useEffect} from 'react';
import loginFormSchema from '../utils/validation/login-form-schema';

const LoginForm = ({onSubmit}) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isValidForm = () => {
    setErrors({});
    const validationResult = loginFormSchema.validate(inputs, { abortEarly: false });
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
    await setInputs(values => ({ ...values, [name]: value }))
    
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
    onSubmit({...inputs});
  }

  const isSubmitDisabled = () => {
    return Object.keys(errors).length > 0 || Object.keys(inputs).length < 2;
  }

  return (
    <form data-testid="login-form" onSubmit={onHandleSubmit} className="ui form">
      <label htmlFor="username">Användarnamn:</label>
      <input
        className={`input ${errors.username ? "error" : null}`}
        data-testid="username"
        id="username"
        name="username"
        label="Användarnamn:"
        type="text"
        value={inputs.username || ""} 
        onChange={onHandleChange} />
      <div className="form error-message">
        {errors.username ? errors.username : null}
      </div>
      <label htmlFor="password">Lösenord:</label>
      <input
        className={`input ${errors.password ? "error" : null}`}
        data-testid="password"
        id="password"
        name="password"
        label="Lösenord:"
        type="password"
        value={inputs.password || ""} 
        onChange={onHandleChange} />
      <div className="form error-message">
        {errors.password ? errors.password : null}
      </div>
      <div className="button-group">
        <button data-testid="btn-login" className="button button--primary"  type="submit" disabled={isSubmitDisabled()}>Logga in</button>
        <button data-testid="btn-clear" className="button button--secondary" onClick={onHandleClear}>Rensa</button>
      </div>
    </form>
  )
}

export default LoginForm;