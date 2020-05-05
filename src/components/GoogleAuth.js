import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import { signIn, signOut, setUserProfile } from '../actions';
import { CLIENT_ID } from '../constants';

const GoogleAuth = props => {
  const { userProfile } = props;

  const auth = useRef();

  const onAuthChange = isSignedIn => {
    isSignedIn ? props.signIn(auth.current.currentUser.get().getId()) : props.signOut();
  }

  useEffect(() =>
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email'
      })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance()
          onAuthChange(auth.current.isSignedIn.get());
          if (auth.current.isSignedIn.get()) props.setUserProfile(auth.current.currentUser.get().getBasicProfile());
          else props.setUserProfile(null);
          auth.current.isSignedIn.listen(onAuthChange);
        })
    }
    ));


  const onSignInClick = () => {
    auth.current.signIn();
  }

  const onSignOutClick = () => {
    auth.current.signOut();
  }
  const renderAuthButton = () => {
    if (props.isSignedIn === null) return (<button className="ui red loading button">
      <i className="google icon" /></button>);
    else if (props.isSignedIn) {
      return (<button onClick={onSignOutClick} className="ui red google button">
        <i className="google icon" />
        Sign Out {userProfile && userProfile.getGivenName()}
      </button>);
    } else {
      return (<button onClick={onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>);
    }
  }

  return (
    <div>
      {renderAuthButton()}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userProfile: state.auth.userProfile
  }
};
export default connect(mapStateToProps, { signIn, signOut, setUserProfile })(GoogleAuth);