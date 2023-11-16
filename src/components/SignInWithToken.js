import React, { useEffect } from 'react';
import moment from 'moment';
import history from '../history';
import { isEmpty } from 'lodash-fp';
import { connect } from 'react-redux';
import { signInWithToken, setSelectedService, getServicesByResidence } from '../actions';

const SignInWithToken = props => {
  
  const { token, serviceId, residenceId } = props.match.params;

  const {
    signInWithToken,
    setSelectedService,
    getServicesByResidence,
    service: {
      services = [],
    },
    auth: {
      user = {},
    }
  } = props;

  console.log('token:', token, 'serviceId:', serviceId)

  useEffect(() => {
    if (residenceId) {
      getServicesByResidence(residenceId);
    }
  }, [residenceId, getServicesByResidence]);

  useEffect(() => {
    if (services.length > 0 && serviceId) {
      const service = services.find(service => service.id === serviceId);
      setSelectedService(service);
      localStorage.removeItem('user');
      localStorage.removeItem('residence');
      signInWithToken(token);

    }
  }, [services, serviceId, setSelectedService, signInWithToken, token]);

  useEffect(() => {
    if (!isEmpty(user)) {
      console.log('isEmpty:', user)
      history.push(`/${serviceId}/calendar/${moment().format('YYYY')}/${moment().format('MM')}`);
    }
  }, [user, serviceId]);


  return <div>Login with token</div>
}
const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
    service: state.service,
  })
}
export default connect(mapStateToProps, { signInWithToken, getServicesByResidence, setSelectedService })(SignInWithToken);