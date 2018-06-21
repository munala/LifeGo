import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import Form from '../';

jest.mock('axios');
axios.post = jest.fn().mockReturnValue({ url: 'image' });

describe('Form tests', () => {
  let wrapper;
  const onClose = jest.fn();
  const save = jest.fn();
  const bucketlist = {
    name: '',
    description: '',
    category: '',
    dueDate: '',
    location: '',
  };

  beforeAll(() => {
    wrapper = shallow(<Form
      onClose={onClose}
      open
      save={save}
    />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles text change', () => {
    const inputs = wrapper.find('WithStyles(TextInput)');
    inputs.first().props().onChange({ target: { value: 'value' } });
    expect(wrapper.instance().state.bucketlist.name).toEqual('value');
  });

  it('handles submitting', () => {
    const inputs = wrapper.find('WithStyles(TextInput)');
    inputs.first().props().onChange({ target: { value: 'value' } });

    const buttons = wrapper.find('WithStyles(FlatButton)');
    buttons.last().props().onClick();

    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith({ ...bucketlist, name: 'value' });
  });

  it('handles  photos', () => {
    const inputs = wrapper.find('WithStyles(TextInput)');
    inputs.first().props().onChange({ target: { value: 'value' } });
    const photoField = wrapper.find('PhotoField');

    const fileContents = 'name: image';
    const image = new Blob([fileContents], { type: 'image' });

    // adding photo
    photoField.props().changePhoto({ target: { files: [image] } });
    expect(wrapper.instance().state.image).toEqual(image);

    // uploading photo
    const buttons = wrapper.find('WithStyles(FlatButton)');
    buttons.last().props().onClick();
    expect(axios.post).toHaveBeenCalledTimes(1);

    // remove photo
    photoField.props().removePhoto();
    expect(wrapper.instance().state.image).toEqual(null);
  });
});
