import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../';

describe('DatePicker tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DatePicker
      label="source"
      defaultValue=""
      onChange={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
