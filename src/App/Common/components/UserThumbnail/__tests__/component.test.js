import React from 'react';
import { shallow } from 'enzyme';
import UserThumbnail from '../';

describe('UserThumbnail tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<UserThumbnail
      profile={{ id: 1, friends: [] }}
      person={{ id: 1, friends: [] }}
      addFriend={() => {}}
      removeFriend={() => {}}
      goToProfile={() => {}}
      alert={{}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
