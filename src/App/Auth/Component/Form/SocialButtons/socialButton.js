import React from 'react';
import SocialLogin from 'react-social-login';
import { PropTypes } from 'prop-types';

const Button = ({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    { children }
  </button>
);

Button.propTypes = {
  children: PropTypes.shape({}).isRequired,
  triggerLogin: PropTypes.func.isRequired,
};

export default SocialLogin(Button);
