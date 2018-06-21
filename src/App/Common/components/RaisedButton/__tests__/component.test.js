import React from 'react';
import { shallow } from 'enzyme';
import RaisedButton from '../';

describe('RaisedButton tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RaisedButton
      label="source"
      onClick={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
