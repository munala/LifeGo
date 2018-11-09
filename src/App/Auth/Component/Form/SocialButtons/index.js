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
      appId="531895450608613"
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
      appId="536401764654-oermjhtubp76ffhekt23f8mcr093eoql.apps.googleusercontent.com"
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
