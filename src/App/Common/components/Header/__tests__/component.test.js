import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Container';

describe('Header tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Header
      menuIconClick={() => {}}
      title="home"
      avatarUrl="url"
      loggedIn
      counts={{}}
      onChange={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
