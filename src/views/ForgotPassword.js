import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestNewPassword } from '../actions';
import RequestPasswordForm from '../components/RequestNewPasswordForm';
import InfoBar from '../components/InfoBar';


const forgotPassword = props => {
    const { requestNewPassword } = props;
    const onSubmit = ({ email }) => {
        requestNewPassword(email);
      }
    return (
        <div className="page-container">
            <InfoBar title="Glömt lösenord" />
            <div>
                <div>
                <RequestPasswordForm onSubmit={onSubmit} />
                </div>
            </div>
            <div className="ui divider"></div>
            <div className="button-group">
                <Link className="" to="/user/login">Tillbaka till login</Link>
                <Link className="" to="/user/create">Ny användare</Link>
            </div>
            <div className="ui divider"></div>
        </div>);
}
    
const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, { requestNewPassword })(forgotPassword);