import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment } from 'semantic-ui-react';
import PusherHeader from '../components/PusherHeader';
const Home = () => {
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <PusherHeader title="Välkommen" subTitle="Klicka på Kalender i menyn ovan för att påbörja din bokning." />
      </Segment>
    </Sidebar.Pusher>
  )
}
export default connect(null, {})(Home);