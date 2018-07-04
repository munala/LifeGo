import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from '../../Common/components/RaisedButton';
import '../styles.css';

const ChangeEmailField = ({
  emailMode,
  renderInputs,
  renderSaveButtons,
  toggleMode,
}) => (emailMode ?
  <div className="settings-inputs">
    <div className="settings-input-label">Change email</div>
    {renderInputs(['email', 'password']) }
    {renderSaveButtons('emailMode')}
  </div> :
  <RaisedButton
    label="Change email"
    style={{ width: 200 }}
    onClick={() => toggleMode('emailMode', true)}
  />);

ChangeEmailField.propTypes = {
  emailMode: PropTypes.bool.isRequired,
  renderInputs: PropTypes.func.isRequired,
  renderSaveButtons: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default ChangeEmailField;
