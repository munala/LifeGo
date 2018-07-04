import { Component } from 'react';
import propTypes from './propTypes';

export const userSettings = {
  email: '',
  password: '',
  new: '',
  confirm: '',
};

class BaseClass extends Component {
  onChange = (text, field) => {
    const { settings } = this.state;
    settings[field] = text;
    this.setState({ settings });
  }

  toggleReminders = () => {
    const {
      id, createdAt, updatedAt, userId, ...profile
    } = { ...this.props.profile };
    profile.reminders = !!profile.reminders;

    profile.reminders = !profile.reminders;

    this.props.actions.updateProfile(profile, 'settings');
  }

  togglePrivacy = (privacy) => {
    const {
      id, createdAt, updatedAt, userId, ...profile
    } = { ...this.props.profile };

    profile.privacy = privacy;

    this.props.actions.updateProfile(profile, 'settings');
  }

  toggleMode = (type, mode) => {
    const newState = { ...this.state };
    newState[type] = mode;
    this.setState({ ...newState });
  }

  changeEmail = async () => {
    this.setState({ saving: true });
    const { settings: { email, password } } = this.state;
    const { error } = await this.props.actions.changeEmail({
      email,
      password,
    });
    if (!error) {
      this.toggleMode('emailMode', false);
      this.setState({ errors: {}, settings: userSettings });
    } else {
      this.setState({
        error,
        errors: {
          email: error.includes('email') || error.includes('Email'),
          password: error.includes('password') || error.includes('Unauthorised'),
        },
      });
    }
    this.setState(() => ({ saving: false }));
  }

  changePassword = async () => {
    this.setState(() => ({ saving: true }));
    const { email, ...rest } = this.state.settings;
    rest.reminders = rest.reminders ? rest.reminders : false;
    const { error } = await this.props.actions.changePassword({
      ...rest,
      newPassword: rest.new,
      oldPassword: rest.password,
    });
    if (!error) {
      this.toggleMode('passwordMode', false);
      this.setState({ errors: {}, settings: userSettings });
    } else {
      this.setState({
        error: error === 'Unauthorised' ? 'Wrong password' : error,
        errors: {
          ...this.state.errors,
          old: error === 'Unauthorised' || error.includes('oldPassword'),
          new: error === 'Passwords do not match' || error.includes('newPassword') || error.includes('old password'),
          confirm: error === 'Passwords do not match' || error.includes('confirm'),
        },
      });
    }
    this.setState(() => ({ saving: false }));
  }

  delete = async () => {
    this.setState({ saving: true, showDialog: false });
    const { email, password } = this.state.settings;
    const { error } = await this.props.actions.deleteAccount({
      email,
      password,
    });

    if (!error) {
      localStorage.removeItem('token');
      this.props.history.push('login');
    } else {
      this.setState({
        error: error === 'Unauthorised' ? 'Wrong password' : error,
        deleteMode: true,
        errors: {
          email: error.includes('email') || error.includes('Email'),
          password: error.includes('password') || error.includes('Unauthorised'),
        },
      });
    }

    this.setState({ saving: false });
  }

  deleteAccount = async () => {
    const { email, password } = this.state.settings;
    if (!email || !password) {
      this.setState({
        error: 'Fill the highlighted fields first',
        errors: {
          email: !email,
          password: !password,
        },
      });
    } else {
      this.setState({
        showDialog: true,
        deleteMode: false,
      });
    }
  }

  closeDialog = async () => {
    this.setState({
      showDialog: false,
      deleteMode: false,
      settings: userSettings,
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
