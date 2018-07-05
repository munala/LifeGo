import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from '../../Common/components/RaisedButton';
import '../styles.css';

const DeleteAccountField = ({
  deleteMode,
  renderInputs,
  renderSaveButtons,
  toggleMode,
}) => (deleteMode ?
  <div className="settings-inputs">
    <div className="settings-input-label">Delete account</div>
    {renderInputs(['delete email', 'password'])}
    {renderSaveButtons('deleteMode')}
  </div> :
  <RaisedButton
    label="Delete account"
    style={{ width: 200, backgroundColor: 'red' }}
    onClick={() => toggleMode('deleteMode', true)}
  />);

DeleteAccountField.propTypes = {
  deleteMode: PropTypes.bool.isRequired,
  renderInputs: PropTypes.func.isRequired,
  renderSaveButtons: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default DeleteAccountField;
