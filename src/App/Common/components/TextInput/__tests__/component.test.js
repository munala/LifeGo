import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../';

describe('TextInput tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TextInput
      name="name"
      value="value"
      onChange={() => {}}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
