import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import { toggleSidebar } from '../actions';

const Home = props => {
  const { toggleSidebar } = props;
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <Icon name="bars" onClick={toggleSidebar}></Icon>
        <h3>Välkommen</h3>
        <p>Klicka på Kalender i menyn ovan för att påbörja din bokning.</p>
      </Segment>
    </Sidebar.Pusher>
  )
}
export default connect(null, { toggleSidebar })(Home);