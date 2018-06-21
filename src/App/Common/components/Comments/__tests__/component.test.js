import React from 'react';
import { shallow } from 'enzyme';
import Comments from '../';

describe('Comments tests', () => {
  let wrapper;
  const addComment = jest.fn().mockReturnValue({});
  const deleteComment = jest.fn().mockReturnValue({});
  const goToProfile = jest.fn();
  const bucketlist = { id: 1, comments: [{ id: 1, content: 'comment' }] };
  const openDialog = jest.fn();

  beforeAll(() => {
    wrapper = shallow(<Comments
      bucketlist={bucketlist}
      actions={{
        addComment,
        deleteComment,
      }}
      profile={{ id: 1 }}
      mode="single"
      goToProfile={goToProfile}
      openDialog={openDialog}
    />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles text change', () => {
    const input = wrapper.find('NewInput');
    input.props().onChange({ target: { value: 'value' } });
    expect(wrapper.instance().state.comment.content).toEqual('value');
  });

  it('handles submitting', () => {
    const input = wrapper.find('NewInput');
    input.props().onChange({ target: { value: 'value' } });

    input.props().save();

    expect(addComment).toHaveBeenCalledTimes(1);
    expect(addComment).toHaveBeenCalledWith(bucketlist, { content: 'value' });
  });

  it('handles going to profile', () => {
    const comment = wrapper.find('a');

    comment.props().onClick();

    expect(goToProfile).toHaveBeenCalledTimes(1);
  });
});
