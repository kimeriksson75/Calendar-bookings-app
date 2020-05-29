import React from 'react';
import { connect } from 'react-redux';
import { Menu, Header, Icon } from 'semantic-ui-react';
import { toggleSidebar } from '../actions';

const PusherHeader = props => {
  const { selectedService, toggleSidebar, title, subTitle } = props;

  return (
    <React.Fragment>
      <Menu>
        <Menu.Item>
          <Icon size="large" name="bars" onClick={toggleSidebar}></Icon>
        </Menu.Item>
        <Menu.Item>
          <Header>{selectedService && selectedService.name}</Header>
        </Menu.Item>
      </Menu>
      <h4 className="ui header">{title}
        <div className="sub header">{subTitle}</div>
      </h4>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return ({
    selectedService: state.service.selectedService
  })
}
export default connect(mapStateToProps, { toggleSidebar })(PusherHeader)