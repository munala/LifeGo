import React from 'react';
import { shallow } from 'enzyme';
import Items from '../';

describe('Items tests', () => {
  let wrapper;
  const saveItem = jest.fn().mockReturnValue({});
  const deleteItem = jest.fn().mockReturnValue({});
  const updateItem = jest.fn().mockReturnValue({});
  const bucketlist = {
    id: 1,
    items: [{ id: 1, name: 'item', done: true }],
    userId: 1,
  };

  beforeAll(() => {
    wrapper = shallow(<Items
      bucketlist={bucketlist}
      profile={{ id: 1 }}
      actions={{
        saveItem,
        deleteItem,
        updateItem,
      }}
      mode="single"
    />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles text change', () => {
    const input = wrapper.find('NewInput');
    input.props().onChange({ target: { value: 'value' } });
    expect(wrapper.instance().state.item.name).toEqual('value');
  });

  it('handles submitting', () => {
    const input = wrapper.find('NewInput');
    input.props().onChange({ target: { value: 'value' } });

    input.props().save();

    expect(saveItem).toHaveBeenCalledTimes(1);
    expect(saveItem).toHaveBeenCalledWith(bucketlist, { name: 'value' });
  });

  it('handles marking as done', () => {
    const item = wrapper.find('CheckBox');
    item.props().onChange();

    expect(updateItem).toHaveBeenCalledTimes(1);
  });
});
