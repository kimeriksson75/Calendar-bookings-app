import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Icon, Menu, Header } from 'semantic-ui-react';
import { toggleSidebar } from '../actions';
import PusherHeader from '../components/PusherHeader';
const Home = props => {
  const { toggleSidebar } = props;
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <PusherHeader title="Välkommen" subTitle="Klicka på Kalender i menyn ovan för att påbörja din bokning." />
      </Segment>
    </Sidebar.Pusher>
  )
}
export default connect(null, { toggleSidebar })(Home);