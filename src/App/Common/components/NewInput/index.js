import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import TextInput from '../TextInput';
import './styles.css';

const NewInput = ({
  name,
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
      name=""
      type="text"
      placeholder={`type ${content.type}`}
      multiline
      disableUnderline
      onFocus={focus}
      value={content.content || ''}
      onChange={onChange}
      className="text-field"
      style={{
        fontSize: 14,
        borderRadius: 10,
        backgroundColor: '#f7f7f7',
        overflow: 'hidden',
        padding: 5,
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') { save(); }
      }
}
    />
    <a
      className="submit-button"
      onClick={submitting ? () => {} : save}
    >
      {buttonLabel.toUpperCase()}
    </a>
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
  name: PropTypes.string.isRequired,
};

NewInput.defaultProps = {
  pictureUrl: null,
  editMode: false,
  focus: () => {},
  cancel: () => {},
};

export default NewInput;
