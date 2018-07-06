import React from 'react';
import { shallow } from 'enzyme';
import NewInput from '../';

describe('NewInput tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NewInput
      buttonLabel="name"
      name="name"
      submitting={false}
      value="value"
      content={{ type: 'edit' }}
      save={() => {}}
      onChange={() => {}}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
