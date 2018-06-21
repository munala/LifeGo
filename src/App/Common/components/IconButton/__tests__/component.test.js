import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '../';

describe('IconButton tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<IconButton
      name="home"
      onClick={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
