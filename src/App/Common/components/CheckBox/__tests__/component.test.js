import React from 'react';
import { shallow } from 'enzyme';
import CheckBox from '../';

describe('CheckBox tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CheckBox checked src="source" />);
    expect(wrapper).toMatchSnapshot();
  });
});
