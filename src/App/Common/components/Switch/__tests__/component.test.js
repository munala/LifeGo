import React from 'react';
import { shallow } from 'enzyme';
import Switch from '../';

describe('Switch tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Switch checked src="source" />);
    expect(wrapper).toMatchSnapshot();
  });
});
