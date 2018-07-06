import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import BaseClass, { userSettings } from './BaseClass';
import RaisedButton from '../../Common/components/RaisedButton';
import OutlinedButton from '../../Common/components/OutlinedButton';
import SnackBarComponent from '../../Common/components/SnackBarComponent';
import ChangeEmailField from '../ChangeEmailField';
import ChangePasswordField from '../ChangePasswordField';
import DeleteAccountField from '../DeleteAccountField';
import Dialog from '../../Common/components/Dialog';
import Switch from '../../Common/components/Switch';
import styles from '../styles';
import '../styles.css';

class Settings extends BaseClass {
  state = {
    open: false,
    error: '',
    emailMode: false,
    passwordMode: false,
    settings: userSettings,
    errors: {
      email: false,
      password: false,
      new: false,
      confirm: false,
    },
    deleteMode: false,
    saving: false,
    showDialog: false,
  }

  renderInputs = fields => fields.map((name) => {
    let [field] = name.split(' ');
    const error = field === 'delete' ? this.state.errors.email : this.state.errors[field];
    field = field === 'old' ? 'password' : field;
    field = field === 'delete' ? 'email' : field;
    let displayName = name === 'email' ? `new ${name} (${this.props.profile.email})` : name;
    displayName = name === 'delete email' ? 'email' : displayName;

    const value = this.state.settings[name === 'delete email' ? 'email' : name];

    return (
      <TextField
        key={name}
        type={name.includes('password') ? 'password' : field}
        label={displayName}
        error={error}
        value={value}
        onChange={({ target: { value: text } }) => this.onChange(text, field)}
        placeholder={`type ${field === 'email' ? 'email' : displayName}`}
        style={styles.marginFive}
      />
    );
  })

  renderSaveButtons = (type) => {
    const { saving } = this.state;

    const actions = {
      passwordMode: this.changePassword,
      emailMode: this.changeEmail,
      deleteMode: this.deleteAccount,
    };

    const text = type === 'deleteMode' ? 'DELETE ACCOUNT' : 'SAVE';

    return (
      <div className="settings-submit-buttons">
        {
          !saving &&
          <OutlinedButton
            label="cancel"
            onClick={() => this.toggleMode(type, false)}
          />
        }
        <RaisedButton
          onClick={actions[type]}
          label={saving ? `${type === 'deleteMode' ? 'deleting' : 'saving'}...` : text}
          style={type === 'deleteMode' ? { backgroundColor: 'red' } : {}}
        />
      </div>
    );
  }

  render() {
    const { profile } = this.props;
    const {
      open,
      error,
      emailMode,
      passwordMode,
      deleteMode,
      showDialog,
    } = this.state;

    return (
      <div className="settings-container">
        <div className="settings-reminder">
          <div className="settings-input-label">Email reminders</div>
          <Switch
            checked={profile.reminders === true}
            onChange={this.toggleReminders}
          />
        </div>
        <TextField
          name="privacy"
          value={profile.privacy || ''}
          select
          label="Who can see your lists?"
          onChange={({ target: { value } }) => this.togglePrivacy(value)}
          style={styles.privacyStyle}
        >
          {['everyone', 'friends', 'no one'].map(setting => (
            <MenuItem key={setting} value={setting}>
              {setting}
            </MenuItem>
          ))}
        </TextField>
        <ChangeEmailField
          emailMode={emailMode}
          renderInputs={this.renderInputs}
          renderSaveButtons={this.renderSaveButtons}
          toggleMode={this.toggleMode}
        />
        <ChangePasswordField
          passwordMode={passwordMode}
          renderInputs={this.renderInputs}
          renderSaveButtons={this.renderSaveButtons}
          toggleMode={this.toggleMode}
        />
        <DeleteAccountField
          deleteMode={deleteMode}
          renderInputs={this.renderInputs}
          renderSaveButtons={this.renderSaveButtons}
          toggleMode={this.toggleMode}
        />
        {
          showDialog &&
          <Dialog
            type="conversation"
            message="Are you sure you want to delete your account? This action cannot be undone."
            onConfirm={this.delete}
            onCancel={this.closeDialog}
          />
        }
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

export default Settings;
