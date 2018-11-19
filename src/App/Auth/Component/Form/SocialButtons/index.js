import React from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import '../../../styles.css';

const SocialButtons = () => (
  <div className="social-buttons">
    <FacebookLoginButton
      text="Connect with Facebook"
      onClick={() => {
        window.location.href = `${process.env.REACT_APP_API_HOST}/auth/facebook`;
      }}
    />
    <GoogleLoginButton
      text="Connect with Google&nbsp;&nbsp;&nbsp;&nbsp;"
      onClick={() => {
        window.location.href = `${process.env.REACT_APP_API_HOST}/auth/google`;
      }}
    />
  </div>
);

export default SocialButtons;
