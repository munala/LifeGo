import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from '../';

describe('FlatButton tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FlatButton
      label="source"
      onClick={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
