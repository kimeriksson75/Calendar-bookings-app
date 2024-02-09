import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const UserMessage = props => {
  const { userMessage, layout } = props;
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

  useEffect(() => {
    if (!userMessage?.message) {
      return;
    }
    toast[userMessage?.message?.type](userMessage?.message?.description, {
      position: "bottom-center",
      autoClose: 3000,
      draggable: true,
      transition: Bounce,
      theme: layout === 'dark' ? 'dark' : 'light',
      icon: <Icon data-testid="user-message-icon" size="large" name={`${iconClassName(userMessage?.message?.type || '')}`} />,
      testId: 'user-message',
      // hideProgressBar: false,
      // closeOnClick: true,
      // pauseOnHover: true,
      // progress: undefined,
    });
  }, [userMessage]);

  const className = type => {
    switch (type) {
      case 'warning':
        return 'message message--warning';
      case 'error':
        return 'message message--error';
      case 'success':
        return 'message message--success';
      case 'info':
        return 'message message--info';
      default:
        return 'message message--info';
    }
  }
  const iconClassName = type => {
    switch (type) {
      case 'warning':
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
    <div data-testid="user-message-container">
      <ToastContainer data-testid="user-message"/>
      {/* <div data-testid="user-message" className={className(userMessage?.message?.type || '')}>
        <div>
          <Icon data-testid="user-message-icon" size="large" name={`${iconClassName(userMessage?.message?.type || '')}`} />
        </div>
        <p>{`${userMessage?.message?.title}`}</p>
        <div><p>{`${userMessage?.message?.description}`}</p></div>
      </div> */}
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return ({
    userMessage: state.userMessage,
    layout: state.application.layout,
  })
}
export default connect(mapStateToProps, {})(UserMessage);