import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

const UserMessage = props => {
  const { userMessage } = props;
  const timer = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(Boolean(userMessage));
  }, [userMessage])

  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setModalOpen(false);
    }, 3000);
    return () => clearTimeout(timer.current);
  }, [modalOpen, userMessage, timer]);

  const className = type => {
    switch (type) {
      case 'alert':
        return 'message message--warning';
      case 'error':
        return 'message message--error';
      case 'success':
        return 'message message--success';
      default:
        return 'message message';
    }
  }
  const iconClassName = type => {
    switch (type) {
      case 'alert':
        return 'warning sign'
      case 'error':
        return 'warning sign'
      case 'success':
        return 'check circle'
      default:
        return 'info circle'
    }
  }
  return (
    <div data-testid="user-message-container" className={`message-container ${modalOpen && userMessage?.message ? 'message-container-show' : 'message-container-hide'}`}>
      <div data-testid="user-message" className={className(userMessage?.message?.type || '')}>
        <Icon data-testid="user-message-icon" size="large" name={`${iconClassName(userMessage?.message?.type || '')}`} />
        <span>{`${userMessage?.message?.description}`}</span>
      </div>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    userMessage: state.userMessage
  })
}
export default connect(mapStateToProps, {})(UserMessage);