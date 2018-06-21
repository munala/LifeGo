import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../';

describe('Avatar tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Avatar src="source" />);
    expect(wrapper).toMatchSnapshot();
  });
});
