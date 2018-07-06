import React from 'react';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';

import categories from './categories';
import TextInput from '../TextInput';
import FlatButton from '../FlatButton';
import DatePicker from '../DatePicker';
import PhotoField from './PhotoField';
import LocationField from './LocationField';
import BaseClass, { initialBucketlist } from './BaseClass';
import propTypes from './propTypes';
import styles from './styles';
import './styles.css';

class Form extends BaseClass {
  state = {
    disabled: true,
    bucketlist: this.props.bucketlist,
    saving: false,
    error: false,
    image: null,
    imageUrl: this.props.bucketlist.pictureUrl || '',
  };

  static getDerivedStateFromProps = ({ bucketlist }, state) => {
    if (bucketlist.updatedAt !== state.bucketlist.updatedAt) {
      return ({
        ...state,
        bucketlist,
        imageUrl: bucketlist.pictureUrl || '',
      });
    }
    return state;
  }

  render() {
    const {
      onClose, open, bucketlist: bucketList, profile,
    } = this.props;

    const {
      error, disabled, saving, imageUrl,
    } = this.state;

    const { bucketlist } = this.state;

    bucketlist.privacy = bucketlist.privacy || profile.privacy;

    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <div className="form-container">
          <div className="form-title">{`${this.props.bucketlist.name ? 'Edit' : 'Add'} bucketlist`}</div>
          <div className="input-wrapper">
            <TextInput
              autoFocus
              name="name"
              placeholder="name of your bucketlist"
              value={bucketlist.name || ''}
              style={styles.input}
              onChange={({ target: { value } }) => this.onChange({ value, type: 'name' })}
              error={error}
            />
            <TextInput
              name="description"
              placeholder="tell people more about your bucketlist"
              value={bucketlist.description || ''}
              onChange={({ target: { value } }) => this.onChange({ value, type: 'description' })}
              style={styles.input}
              multiline
              rows={4}
              rowsMax={4}
            />
            <DatePicker
              label="due date"
              onChange={({ target: { value } }) => this.onChange({ value, type: 'dueDate' })}
              defaultValue={bucketlist.dueDate || ''}
            />
            <TextInput
              name="category"
              value={bucketlist.category || ''}
              select
              label="select category"
              onChange={({ target: { value } }) => this.onChange({ value, type: 'category' })}
              style={styles.input}
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextInput>
            <LocationField
              bucketlist={bucketlist}
              onChange={this.onChange}
            />
            <PhotoField
              bucketlist={bucketlist}
              changePhoto={this.changePhoto}
              imageUrl={imageUrl}
              removePhoto={this.removePhoto}
            />
            <TextInput
              name="privacy"
              value={bucketlist.privacy || ''}
              select
              label="privacy"
              onChange={({ target: { value } }) => this.onChange({ value, type: 'privacy' })}
              style={styles.input}
            >
              {['everyone', 'friends', 'no one'].map(setting => (
                <MenuItem key={setting} value={setting}>
                  {setting}
                </MenuItem>
              ))}
            </TextInput>

          </div>
          <div className="actions">
            <FlatButton
              label="cancel"
              style={{ color: 'grey' }}
              onClick={onClose}
            />
            <FlatButton
              label={bucketList ? 'save' : 'add'}
              keyboardFocused
              onClick={this.onSave}
              disabled={saving || disabled}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

Form.propTypes = propTypes;

Form.defaultProps = {
  bucketlist: initialBucketlist,
};

export default Form;
