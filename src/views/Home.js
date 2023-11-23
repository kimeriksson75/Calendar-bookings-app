import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../history';
import { getServicesByResidence, setSelectedService } from '../actions';
import { find, isEmpty } from 'lodash-fp';
import { Dropdown, Icon } from 'semantic-ui-react';
import InfoBar from '../components/InfoBar';

const Home = props => {
  const {
    auth: {
      isSignedIn = false,
      user = {},
    },
    service: {
      services = [],
      selectedService = {}
    },
    getServicesByResidence,
    setSelectedService
  } = props;

  const __currentDate = moment();

  if (!isSignedIn) history.push('/user/login')

  
  useEffect(() => {
    isSignedIn && user?.residence && getServicesByResidence(user.residence);
  }, [isSignedIn, getServicesByResidence, user]);

  useEffect(() => {
    if (selectedService && !isEmpty(selectedService)) {
      history.push(`/${selectedService.id}/calendar/${__currentDate.format('YYYY')}/${__currentDate.format('MM')}/${__currentDate.format('D')}`)
    }
  }, [selectedService, __currentDate]);

  const onChangeService = (e, data) => {
    const service = find({ id: data.value }, services)
    setSelectedService(service);
  }
  const renderServices = services => {
    return (
      <Dropdown
        placeholder="Vad vill du boka?"
        fluid
        selection
        onChange={onChangeService}
        // defaultValue={selectedService && selectedService.id}
        options={services.map(service => ({
          key: service.id,
          value: service.id,
          text: service.name
        }))} />
    )
  }
  return (
    <div className="page-container">
      <InfoBar title="Välkommen"/>

        {services && renderServices(services)}
        {selectedService && (<div>
          <div className="ui divider"></div>
          <p>Nu kan du påbörja din bokning. Klicka på Kalendern i menyn <Icon size="small" name="bars"></Icon>.</p></div>)}
    </div>
  )
}
const mapStateToProps = state => {
  return ({
    auth: state.auth,
    service: state.service,
  })
}
export default connect(mapStateToProps, { getServicesByResidence, setSelectedService })(Home);