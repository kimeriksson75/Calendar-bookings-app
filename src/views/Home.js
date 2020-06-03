import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { getAvailableServices, setSelectedService } from '../actions';
import { find } from 'lodash-fp';
import { Sidebar, Segment, Dropdown, Icon } from 'semantic-ui-react';
import PusherHeader from '../components/PusherHeader';

const Home = props => {
  const { auth: { isSignedIn = false }, service: { services = [], selectedService = {} }, getAvailableServices, setSelectedService
  } = props;

  if (!isSignedIn) history.push('/user/login')

  useEffect(() => {
    isSignedIn && getAvailableServices();
  }, [isSignedIn, getAvailableServices]);

  const onChangeService = (e, data) => {
    const service = find({ id: data.value }, services)
    setSelectedService(service)
  }
  const renderServices = services => {
    return (
      <Dropdown
        placeholder="Vad vill du boka?"
        fluid
        selection
        onChange={onChangeService}
        defaultValue={selectedService && selectedService.id}
        options={services.map(service => ({
          key: service.id,
          value: service.id,
          text: service.name
        }))} />
    )
  }
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <PusherHeader title="Välkommen" subTitle="Välj bland tillgängliga bokningstjänster." />
        {services && renderServices(services)}
        {selectedService && (<div>
          <div className="ui divider"></div>
          <p>Nu kan du påbörja din bokning. Klicka på Kalendern i menyn <Icon size="small" name="bars"></Icon>.</p></div>)}
      </Segment>
    </Sidebar.Pusher>
  )
}
const mapStateToProps = state => {
  return ({
    auth: state.auth,
    service: state.service
  })
}
export default connect(mapStateToProps, { getAvailableServices, setSelectedService })(Home);