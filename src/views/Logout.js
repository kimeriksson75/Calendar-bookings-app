import React from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '../components/InfoBar';

const Logout = () => {
  return (
      <div className="page-container">
        <InfoBar title="Du är nu utloggad" />
        <h3>Välkommen åter!</h3>
        <div className="ui divider"></div>
        <div className="extra">
          <Link className="" to="/user/login">Login</Link>
        </div>
        <div className="extra" style={{ paddingTop: '12px' }}>
          <Link className="" to="/user/create">Eller skapa en ny användare</Link>
        </div>
      </div>)
}
export default Logout;