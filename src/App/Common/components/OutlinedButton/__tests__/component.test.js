import React from 'react';
import { shallow } from 'enzyme';
import OutlinedButton from '../';

describe('OutlinedButton tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<OutlinedButton
      label="source"
      onClick={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
