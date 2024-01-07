import React from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '../components/InfoBar';

const Logout = () => {
  return (
      <div className="page-container">
        <InfoBar title="Du är nu utloggad" />
        <div className="ui divider"></div>
        <div className="extra button-group">
          <Link className="" to="/user/login">Logga in</Link>
          <Link className="" to="/user/create">Ny användare</Link>
        </div>
        <div className="ui divider"></div>
      </div>)
}
export default Logout;