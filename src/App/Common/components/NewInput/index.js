import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import TextInput from '../TextInput';
import OutlinedButton from '../OutlinedButton';
import './styles.css';

const NewInput = ({
  pictureUrl,
  content,
  focus,
  onChange,
  save,
  editMode,
  submitting,
  cancel,
  buttonLabel,
}) => (
  <div className="input-container">
    <Avatar
      style={{ display: 'flex', height: 30, width: 30 }}
      src={
        pictureUrl || require('../../../../assets/images/user.png') // eslint-disable-line global-require
      }
    />
    <TextInput
      type="text"
      placeholder={`type ${content.type}`}
      disableUnderline
      onFocus={focus}
      value={content.content || ''}
      onChange={onChange}
      className="textField"
      style={{ display: 'flex' }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') { save(); }
      }
}
    />
    <OutlinedButton
      onClick={save}
      disabled={submitting}
      label={buttonLabel}
      style={{ display: 'flex' }}
    />
    {
      editMode &&
      <div onClick={cancel}>
        Cancel
      </div>
    }
  </div>
);

NewInput.propTypes = {
  pictureUrl: PropTypes.string,
  content: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  focus: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  submitting: PropTypes.bool.isRequired,
  cancel: PropTypes.func,
  buttonLabel: PropTypes.string.isRequired,
};

NewInput.defaultProps = {
  pictureUrl: null,
  editMode: false,
  focus: () => {},
  cancel: () => {},
};

export default NewInput;
