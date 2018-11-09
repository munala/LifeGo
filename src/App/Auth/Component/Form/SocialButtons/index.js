import React from 'react';
import { PropTypes } from 'prop-types';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import '../../../styles.css';

import SocialLogin from './socialButton';


const SocialButtons = ({ loginOrRegister }) => (
  <div className="social-buttons">
    <SocialLogin
      provider="facebook"
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      onLoginSuccess={data => loginOrRegister(data)}
      onLoginFailure={data => loginOrRegister(data)}
      className="social-button"
    >
      <FacebookLoginButton
        className="social-button-text"
        text="Connect with Facebook"
        onClick={() => {}}
      />
    </SocialLogin>
    <SocialLogin
      provider="google"
      appId={process.env.REACT_APP_GOOGLE_APP_ID}
      onLoginSuccess={data => loginOrRegister(data)}
      onLoginFailure={data => loginOrRegister(data)}
      className="social-button"
    >
      <GoogleLoginButton
        text="Connect with Google"
        onClick={() => {}}
      />
    </SocialLogin>
  </div>
);

SocialButtons.propTypes = {
  loginOrRegister: PropTypes.func.isRequired,
};

export default SocialButtons;
