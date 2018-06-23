import React from 'react';
import { shallow } from 'enzyme';
import SideMenu from '../container';

describe('SideMenu tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SideMenu
      menuItems={{ top: [], bottom: [] }}
      activeItem="home"
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
