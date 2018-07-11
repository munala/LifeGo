/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  onChange = ({ value, type }) => {
    const bucketlist = { ...this.state.bucketlist };
    bucketlist[type] = value || null;

    this.setState({
      bucketlist,
    });
  }

  onSave = async () => {
    const { image, bucketlist: buck } = this.state;
    const bucketlist = { ...buck };
    if (image) {
      this.setState({ uploading: true });
      const { url: pictureUrl } = await this.uploadImage(image);
      this.setState({ uploading: false });
      bucketlist.pictureUrl = pictureUrl;
    }

    this.props.save((bucketlist));
    this.setState({ bucketlist: initialBucketlist });
  }

  changePhoto = ({ target: { files } }) => {
    if (files && files.length > 0) {
      const [image] = files;
      if (image) {
        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.onloadend = (e) => {
          this.setState({
            imageUrl: reader.result,
          });
        };

        const { bucketlist } = this.state;

        this.setState({
          image,
          disabled: !bucketlist.name,
        });
      }
    }
  }

  removePhoto = () => {
    this.setState({
      image: null,
      imageUrl: '',
      bucketlist: {
        ...this.state.bucketlist,
        pictureUrl: null,
      },
    });
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
}

BaseClass.propTypes = propTypes;

export const initialBucketlist = {
  name: '',
  description: '',
  category: '',
  dueDate: '',
  location: '',
  privacy: '',
};

export default BaseClass;
