import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import SnackBarComponent from '../../Common/components/SnackBarComponent';
import IconLabelButton from '../../Common/components/IconLabelButton';
import styles from '../styles';
import '../styles.css';

class EditProfile extends Component {
  state = {
    open: false,
    error: '',
    touched: false,
    firstName: this.props.profile.id ? this.props.profile.displayName.split(' ')[0] : '',
    lastName: this.props.profile.id ? this.props.profile.displayName.split(' ')[1] : '',
  }

  static getDerivedStateFromProps = ({ profile }, state) => {
    if (JSON.stringify(profile) !== JSON.stringify(state.profile)) {
      return ({
        ...state,
        profile,
        firstName: profile.id ? profile.displayName.split(' ')[0] : '',
        lastName: profile.id ? profile.displayName.split(' ')[1] : '',
      });
    }
    return state;
  }

  onChange = ({ name, value }) => {
    const text = `${value.charAt(0).toUpperCase()}${value.substr(1, value.length - 1)}`;
    this.setState({
      [name]: text,
    });
  }

  onSave = async () => {
    const { profile, actions: { updateProfile } } = this.props;
    const { firstName, lastName } = this.state;

    this.setState({ touched: true });

    if (firstName && lastName) {
      const { error } = await updateProfile({
        ...profile,
        displayName: `${firstName} ${lastName}`,
      });

      if (!error) {
        this.setState({ touched: false });
        this.props.toggleProfileMode(false);
      } else {
        this.setState({
          error,
          open: true,
        });
      }
    }
  }

  closeSnackBar = () => {
    this.setState({
      open: false,
      error: '',
    });
  }

  render() {
    const {
      firstName, lastName, touched, open, error,
    } = this.state;

    return (
      <div className="edit-profile-wrapper" >
        <div className="edit-profile-container" >
          <div className="edit-profile-label">Edit Profile</div>
          <TextField
            label="First name"
            placeholder="enter first name"
            style={styles.inputStyle}
            value={firstName}
            error={touched && !firstName}
            onChange={({ target: { value } }) => this.onChange({ name: 'firstName', value })}
          />
          <TextField
            label="Last name"
            placeholder="enter last name"
            error={touched && !lastName}
            value={lastName}
            style={styles.inputStyle}
            onChange={({ target: { value } }) => this.onChange({ name: 'lastName', value })}
          />
          <div className="profile-input-row">
            <IconLabelButton
              label="save"
              name="save"
              onClick={this.onSave}
            />
            <IconLabelButton
              label="cancel"
              name="close"
              style={styles.cancelStyle}
              onClick={() => this.props.toggleProfileMode(false)}
            />
          </div>
        </div>
        <SnackBarComponent
          open={open}
          message={{
            content: error,
            success: false,
          }}
          closeSnackBar={this.closeSnackBar}
        />
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    displayName: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    updateProfile: PropTypes.func.isRequired,
  }).isRequired,
  toggleProfileMode: PropTypes.func.isRequired,
};

export default EditProfile;
