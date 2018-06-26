import React from 'react';

import BaseClass from './BaseClass';
import Form from './Form';
import SnackBarComponent from '../../Common/components/SnackBarComponent';
import LinearProgress from './LinearProgress';
import propTypes from './propTypes';
import '../styles.css';

class AuthComponent extends BaseClass {
  state = {
    login: this.props.location.state && this.props.location.state.login,
    loginUser: {
      email: '',
      password: '',
    },
    registerUser: {
      'display name': '',
      email: '',
      password: '',
    },
    message: {
      success: true,
      content: '',
    },
    resetEmail: '',
    resetMode: false,
    submitting: false,
    touched: false,
    invalid: false,
    open: false,
  }

  static getDerivedStateFromProps = ({
    location, history, loggedIn, actions: { getProfile },
  }, state) => {
    if (loggedIn !== state.loggedIn && loggedIn) {
      history.push('/home');
    }

    return ({
      ...state,
      login: location.state && location.state.login,
    });
  }

  render() {
    const {
      login,
      loginUser,
      registerUser,
      touched,
      invalid,
      error,
      submitting,
      message,
      open,
      resetMode,
      resetEmail,
    } = this.state;

    const { currentApiCalls } = this.props;

    const user = login ? loginUser : registerUser;

    return (
      <div className="auth-container">
        {
          currentApiCalls > 0 &&
          <div className="progress"><LinearProgress color="error" /></div>
        }

        <Form
          loginMode={!!login}
          resetMode={resetMode}
          user={user}
          touched={touched}
          invalid={invalid}
          submitting={submitting}
          error={error}
          resetEmail={resetEmail}
          onChange={this.onChange}
          action={this.action}
          socialLogin={this.socialLogin}
          toggleReset={this.toggleReset}
          onEmailChange={this.onEmailChange}
        />

        <SnackBarComponent
          open={open}
          message={message}
          closeSnackBar={this.closeSnackBar}
        />
      </div>
    );
  }
}

AuthComponent.propTypes = propTypes;

export default AuthComponent;
