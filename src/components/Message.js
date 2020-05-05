import React from 'react';
import { connect } from 'react-redux';
import { newMessage } from '../actions';

const Message = props => {
  const { userMessage, newMessage } = props;

  const className = type => {
    switch (type) {
      case 'alert':
        return 'ui icon message warning';
      case 'error':
        return 'ui icon message negative';
      default:
        return 'ui icon message';
    }
  }
  return (
    <>
      {userMessage && userMessage.message &&
        (<div className={className(userMessage.message.type)}>
          <i className="close icon right" onClick={() => newMessage(null)}></i>
          <div className="content">
            <p>{userMessage.message.message}</p>
          </div>
        </div>)}
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    userMessage: state.userMessage
  })
}
export default connect(mapStateToProps, { newMessage })(Message);