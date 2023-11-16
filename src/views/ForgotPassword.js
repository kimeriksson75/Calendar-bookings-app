import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { requestNewPassword } from '../actions';
import RequestPasswordForm from '../components/RequestNewPasswordForm';
import InfoBar from '../components/InfoBar';


const forgotPassword = props => {
    const { requestNewPassword } = props;
    const onSubmit = ({ email }) => {
        requestNewPassword(email);
      }
    return (
        <Container>
            <InfoBar title="Glömt lösenord" />
            <div>
                <div>
                <RequestPasswordForm onSubmit={onSubmit} />
                </div>
            </div>
            <div className="extra" style={{ paddingTop: '12px' }}>
                <Link className="" to="/user/login">Tillbaka till login</Link>
            </div>
        </Container>);
}
    
const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, { requestNewPassword })(forgotPassword);