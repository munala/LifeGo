/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import axios from 'axios';

import propTypes from './propTypes';

class BaseClass extends Component {
  onChange = ({ value, type }) => {
    const bucketlist = { ...this.state.bucketlist };
    bucketlist[type] = value || null;

    const disabled = !bucketlist.name && bucketlist[type] === this.props.bucketlist[type];

    this.setState({
      bucketlist,
      disabled,
    });
  }

  onSave = async () => {
    const { image, bucketlist } = this.state;
    if (image) {
      const { url: pictureUrl } = await this.uploadImage(image);
      bucketlist.pictureUrl = pictureUrl;
    }

    this.props.save(bucketlist);
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
    });
  }

  uploadImage = async (image) => {
    const apiKey = process.env.REACT_APP_CLOUDINARY_KEY;
    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', 'dl5sqcqz');
    formData.append('api_key', apiKey);

    return axios.post('https://api.cloudinary.com/v1_1/lifego/image/upload', formData);
  };
}

BaseClass.propTypes = propTypes;

export const initialBucketlist = {
  name: '',
  description: '',
  category: '',
  dueDate: '',
  location: '',
};

export default BaseClass;
