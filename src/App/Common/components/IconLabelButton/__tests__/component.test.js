import React from 'react';
import { shallow } from 'enzyme';
import IconLabelButton from '../';

describe('IconLabelButton tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<IconLabelButton
      label="source"
      name="home"
      onClick={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
