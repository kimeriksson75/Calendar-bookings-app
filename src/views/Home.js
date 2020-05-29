import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAvailableServices, setSelectedService } from '../actions';
import { find } from 'lodash-fp';
import { Sidebar, Segment, Dropdown } from 'semantic-ui-react';
import PusherHeader from '../components/PusherHeader';

const Home = props => {
  const { auth: { isSignedIn = false }, service: { services = [] }, getAvailableServices, setSelectedService
  } = props;

  useEffect(() => {
    isSignedIn && getAvailableServices();
  }, [isSignedIn]);


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
        <PusherHeader title="Välkommen" subTitle="Välj vad det är du avser boka från listan." />
        {services && renderServices(services)}
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