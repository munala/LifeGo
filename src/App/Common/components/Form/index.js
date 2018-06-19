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

  render() {
    const { onClose, open } = this.props;

    const {
      bucketlist, error, disabled, saving, imageUrl,
    } = this.state;

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
              value={bucketlist.name}
              onChange={({ target: { value } }) => this.onChange({ value, type: 'name' })}
              error={error}
            />
            <TextInput
              name="description"
              placeholder="tell people more about your bucketlist"
              value={bucketlist.description}
              onChange={({ target: { value } }) => this.onChange({ value, type: 'description' })}
              multiline
              rows={4}
              rowsMax={4}
            />
            <DatePicker
              label="due date"
              onChange={({ target: { value } }) => this.onChange({ value, type: 'dueDate' })}
              defaultValue={bucketlist.dueDate}
            />
            <TextInput
              name="category"
              value={bucketlist.category}
              select
              label="select category"
              onChange={({ target: { value } }) => this.onChange({ value, type: 'category' })}
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
          </div>
          <div className="actions">
            <FlatButton
              label="cancel"
              style={{ color: 'grey' }}
              onClick={onClose}
            />
            <FlatButton
              label="add"
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
