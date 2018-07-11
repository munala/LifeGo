import React from 'react';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import categories from './categories';
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
    bucketlist: this.props.bucketlist,
    uploading: false,
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
      error, imageUrl, uploading,
    } = this.state;

    const { bucketlist, saving } = this.state;

    bucketlist.privacy = bucketlist.privacy || profile.privacy;

    return (
      <Modal
        open={open}
        style={styles.formModal}
        onClose={onClose}
      >
        <div className="form-container">
          <div className="form-title">{`${this.props.bucketlist.name ? 'Edit' : 'Add'} bucketlist`}</div>
          <div className="input-wrapper">
            <TextField
              autoFocus
              name="name"
              placeholder="name of your bucketlist"
              value={bucketlist.name || ''}
              style={styles.input}
              disabled={saving}
              onChange={({ target: { value } }) => this.onChange({ value, type: 'name' })}
              error={error}
            />
            <TextField
              name="description"
              placeholder="tell people more about your bucketlist"
              value={bucketlist.description || ''}
              onChange={({ target: { value } }) => this.onChange({ value, type: 'description' })}
              disabled={saving}
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
            <TextField
              name="category"
              value={bucketlist.category || ''}
              select
              label="select category"
              onChange={({ target: { value } }) => this.onChange({ value, type: 'category' })}
              disabled={saving}
              style={styles.input}
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
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
            <TextField
              name="privacy"
              value={bucketlist.privacy || ''}
              select
              label="privacy"
              onChange={({ target: { value } }) => this.onChange({ value, type: 'privacy' })}
              style={styles.input}
              disabled={saving}
            >
              {['everyone', 'friends', 'no one'].map(setting => (
                <MenuItem key={setting} value={setting}>
                  {setting}
                </MenuItem>
              ))}
            </TextField>

          </div>
          <div className="actions">
            <FlatButton
              label="cancel"
              style={{ color: 'grey' }}
              onClick={onClose}
              disabled={saving}
            />
            <FlatButton
              label={uploading ? 'uploading...' : `${saving ? 'saving...' : `${bucketList ? 'save' : 'add'}`}`}
              keyboardFocused
              onClick={this.onSave}
              disabled={saving || !bucketlist.name}
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
