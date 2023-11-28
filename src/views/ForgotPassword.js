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
            <div className="extra" style={{ paddingTop: '12px' }}>
                <Link className="" to="/user/login">Tillbaka till login</Link>
            </div>
        </div>);
}
    
const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, { requestNewPassword })(forgotPassword);