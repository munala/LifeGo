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
        window.location.href = 'http://localhost:3002/auth/facebook';
      }}
    />
    <GoogleLoginButton
      text="Connect with Google&nbsp;&nbsp;&nbsp;&nbsp;"
      onClick={() => {
        window.location.href = 'http://localhost:3002/auth/google';
      }}
    />
  </div>
);

export default SocialButtons;
