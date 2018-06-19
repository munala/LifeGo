/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

const PhotoField = ({
  bucketlist,
  changePhoto,
  removePhoto,
  imageUrl,
}) => (
  <div className="photo-field">
    <div className="photo-field-label">photo</div>
    <div className="photo-wrapper" onClick={changePhoto}>
      {
        imageUrl &&
        <img
          id="target"
          className="photo"
          alt={bucketlist.name}
          src={imageUrl}
        />
      }
      <div className="photo-actions">
        <label htmlFor="file-upload" className="photo-input-label">
          {imageUrl ? 'change' : 'add'}
        </label>
        <input id="file-upload" className="inputfile" type="file" onChange={changePhoto} />
        {imageUrl && <a href="#" className="photo-input-label" onClick={removePhoto}>remove</a>}
      </div>
    </div>
  </div>
);
PhotoField.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  bucketlist: PropTypes.shape({}).isRequired,
  changePhoto: PropTypes.func.isRequired,
  removePhoto: PropTypes.func.isRequired,
};

export default PhotoField;
