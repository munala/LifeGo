/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  isFriend = user => this.props.profile.friends
    .some(friend => friend.id === user.id);

  openPhotoOptions = ({ currentTarget: anchorEl }) => {
    this.setState({ anchorEl });
  }

  changePhoto = ({ target: { files } }) => {
    const { profile, actions: { updateProfile } } = this.props;

    if (files && files.length > 0) {
      const [image] = files;

      if (image) {
        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.onloadend = async (e) => {
          this.setState({ anchorEl: null });
          const { url: pictureUrl } = await this.uploadImage(image);
          updateProfile({
            ...profile,
            pictureUrl,
          });
        };
      }
    }
  }

  uploadImage = async image => new Promise((resolve, reject) => {
    const apiKey = process.env.REACT_APP_CLOUDINARY_KEY;
    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', 'dl5sqcqz');
    formData.append('api_key', apiKey);
    formData.append('mode', 'no-cors');

    let response;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cloudinary.com/v1_1/lifego/image/upload', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(formData);
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
        resolve(response);
      }
    };
  });

  removePhoto = () => {
    const { profile, actions: { updateProfile } } = this.props;

    updateProfile({
      ...profile,
      pictureUrl: null,
    });
    this.setState({ anchorEl: null });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
