import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Icon } from 'semantic-ui-react';
import { toggleSidebar } from '../actions';

const Home = props => {
  const { toggleSidebar } = props;
  return (
    <Sidebar.Pusher>
      <Segment basic>
        <Icon size="large" name="bars" onClick={toggleSidebar}></Icon>
        <h3 className="ui header">Välkommen
        <div className="sub header">Klicka på Kalender i menyn ovan för att påbörja din bokning.</div>
        </h3>
      </Segment>
    </Sidebar.Pusher>
  )
}
export default connect(null, { toggleSidebar })(Home);