import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { newMessage } from '../actions';
import { Modal } from 'semantic-ui-react'

const Message = props => {
  const { userMessage, newMessage } = props;

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(Boolean(userMessage));
  }, [userMessage])
  const className = type => {
    switch (type) {
      case 'alert':
        return 'ui icon message warning';
      case 'error':
        return 'ui icon message negative';
      case 'success':
        return 'ui icon message success';
      default:
        return 'ui icon message';
    }
  }
  const iconClassName = type => {
    switch (type) {
      case 'alert':
        return 'disabled warning sign icon'
      case 'error':
        return 'disabled warning sign icon'
      case 'success':
        return 'check circle outline icon'
      default:

    }
  }
  return (
    <>
      {userMessage && userMessage.message && (
        <Modal open={modalOpen} onClick={() => setModalOpen(false)}>
          <Modal.Content>
            <div className={className(userMessage.message.type)}>
              <i className="close icon"></i>
              <i className={iconClassName(userMessage.message.type)} />
              <div className="content">
                <div className="header">
                  {userMessage.message.title}
                </div>
                <p>{userMessage.message.description}</p>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      )
      }
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    userMessage: state.userMessage
  })
}
export default connect(mapStateToProps, { newMessage })(Message);