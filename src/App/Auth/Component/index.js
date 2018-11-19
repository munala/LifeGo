import React from 'react';
import DocumentTitle from 'react-document-title';

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
    pictureUrl: null,
  }

  static getDerivedStateFromProps = ({
    location, history, loggedIn,
  }, state) => {
    if (loggedIn !== state.loggedIn && loggedIn) {
      history.push('/home');
    }

    return state;
  }

  componentDidMount = () => {
    if (this.props.location.search) {
      if (this.props.location.search.includes('user')) {
        const [, userString] = this.props.location.search.match(/user=([^#]+)/);
        const user = JSON.parse(decodeURI(userString));
        this.setRegisterUser(user);
      } if (this.props.location.search.includes('token')) {
        const [, token] = this.props.location.search.match(/token=([^#]+)/);
        localStorage.setItem('token', token);
        this.props.actions.socialLogin(token);
      }
    }
  }

  setRegisterUser = ({ displayName, email, pictureUrl }) => {
    const { registerUser } = this.state;

    this.setState({
      registerUser: {
        ...registerUser,
        'display name': displayName,
        email,
      },
      pictureUrl,
      login: false,
    });
  }

  componentDidUpdate = ({ location }) => {
    const { location: { state } } = this.props;
    if (location.state !== state) {
      if (state && state.login !== this.state.login) {
        this.setState({
          login: state.login,
        });
      }
    }
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
      <DocumentTitle title={login ? 'Login' : 'Register'}>
        <div className="auth-container">
          {
            currentApiCalls > 0 &&
            <div className="progress">
              <LinearProgress color="error" />
            </div>
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
            toggleMode={this.toggleMode}
            onEmailChange={this.onEmailChange}
          />

          <SnackBarComponent
            open={open}
            message={message}
            closeSnackBar={this.closeSnackBar}
          />
        </div>
      </DocumentTitle>
    );
  }
}

AuthComponent.propTypes = propTypes;

export default AuthComponent;
