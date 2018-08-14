/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
    onChange = ({ target: { name, value } }) => {
      const { login, loginUser, registerUser } = this.state;

      const users = {
        login: loginUser,
        register: registerUser,
      };

      const mode = login ? 'login' : 'register';

      users[mode][name] = value;
      this.setState({ loginUser, registerUser });
    }

    onEmailChange = ({ target: { value } }) => {
      let { resetEmail } = this.state;
      resetEmail = value;
      this.setState({ resetEmail });
    }

    action = async () => {
      const {
        registerUser, loginUser, login: loginMode, resetMode,
      } = this.state;

      if (resetMode) {
        await this.resetPassword();
      } else {
        const user = loginMode ?
          loginUser :
          { ...registerUser, confirm: registerUser.password };

        const mode = loginMode ? 'login' : 'register';
        const valid = await this.validate(user, mode);

        const submittedUser = { ...user };
        delete submittedUser['display name'];
        submittedUser.displayName = this.titleCase(user['display name']);

        if (valid) {
          this.sendRequest(submittedUser);
        }
      }
    }

    titleCase = (name) => {
      if (name) {
        const [first, middle, last] = name.trim().split(' ');
        let displayName = '';

        if (first) {
          displayName = `${first.charAt(0).toUpperCase()}${first.substr(1, first.length - 1)}`;
        }

        if (middle) {
          displayName = `${displayName} ${middle.charAt(0).toUpperCase()}${middle.substr(1, middle.length - 1)}`;
        }

        if (last) {
          displayName = `${displayName} ${last.charAt(0).toUpperCase()}${last.substr(1, last.length - 1)}`;
        }

        return displayName;
      }

      return name;
    }

    sendRequest = async (user) => {
      const { login: loginMode } = this.state;
      const { register, login } = this.props.actions;
      let errorResponse;

      this.setState({ submitting: true });

      if (loginMode) {
        const response = await login(user);
        const { error } = response;
        errorResponse = error;
      } else {
        const response = await register(user);
        const { error } = response;
        if (!error) {
          await login(user);
        }
        errorResponse = error;
      }

      if (errorResponse) {
        this.setState({ submitting: false });
        if (errorResponse.includes('404') || errorResponse.includes('401')) {
          errorResponse = 'Wrong username or password';
        }
        this.popSnackBar(errorResponse, false);
      }

      this.setState({ submitting: false });
    }

    resetPassword = async () => {
      const { resetEmail } = this.state;

      this.setState({ submitting: true });

      const response = await this.props.actions.resetPassword(resetEmail);

      const { error, message } = response;

      if (error) {
        this.popSnackBar(error, false);
      } else {
        this.popSnackBar(message, true);
      }

      this.setState({ submitting: false });
      return true;
    }

    socialLogin = async (data) => {
      if (data._profile) { // eslint-disable-line no-underscore-dangle
        const {
          email,
          name: displayName,
          id: confirm,
          id: password,
          profilePicURL: pictureUrl,
        } = data._profile; // eslint-disable-line no-underscore-dangle

        const user = {
          email,
          password,
          confirm,
          displayName,
          pictureUrl,
          social: true,
        };

        this.props.actions.socialLogin(user);
      }
    }

    popSnackBar = (message, success) => {
      this.setState({
        message: {
          success,
          content: message,
        },
        open: true,
      });

      setTimeout(() => {
        this.setState({ open: false });
      }, 5000);
    }

    closeSnackBar = () => {
      this.setState({
        open: false,
        message: {
          content: '',
          success: true,
        },
      });
    }

    toggleReset = () => {
      const { resetMode } = this.state;
      this.setState({
        resetMode: !resetMode,
      });
    }

    toggleMode = () => {
      this.setState({ login: !this.state.login });
    }

    validate = async (user, mode) => {
      const valid = Object.keys(user).every(key => !!user[key]);
      this.setState({ invalid: !valid });

      return valid;
    }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
