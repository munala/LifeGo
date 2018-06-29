import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from '../FlatButton';

import './styles.css';

const Dialog = ({
  message,
  onConfirm,
  onCancel,
  type,
}) => (
  <div className={`dialog-container${type === 'message' ? ' message-style' : ''}`}>
    <div className="dialog-message">{message}</div>
    <div className="dialog-button-row">
      <FlatButton
        label="delete"
        style={{ color: '#fff', backgroundColor: 'red' }}
        onClick={onConfirm}
      />
      <FlatButton
        style={{ color: '#fff', backgroundColor: 'grey' }}
        label="cancel"
        onClick={onCancel}
      />
    </div>
  </div>
);

Dialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Dialog;
