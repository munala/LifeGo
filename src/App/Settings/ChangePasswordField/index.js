import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from '../../Common/components/RaisedButton';
import styles from '../styles';
import '../styles.css';

const ChangePasswordField = ({
  passwordMode,
  renderInputs,
  renderSaveButtons,
  toggleMode,
}) => (passwordMode ?
  <div className="settings-inputs">
    <div className="settings-input-label">Change password</div>
    {renderInputs(['old password', 'new password', 'confirm password'])}
    {renderSaveButtons('passwordMode')}
  </div> :
  <RaisedButton
    label="Change password"
    style={styles.raisedButton}
    onClick={() => toggleMode('passwordMode', true)}
  />);

ChangePasswordField.propTypes = {
  passwordMode: PropTypes.bool.isRequired,
  renderInputs: PropTypes.func.isRequired,
  renderSaveButtons: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default ChangePasswordField;
