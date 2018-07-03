import profileReducer from '../reducer';
import * as actions from '../actions';

const initialState = {
  followers: [],
  friends: [],
  searchUsers: [],
  otherProfile: {},
};

describe('Profile reducer', () => {
  it('should getProfile', () => {
    const action = actions.getProfileSuccess({ profile: { name: 'oliver', id: 1 } });
    const newState = profileReducer(initialState, action);

    expect(newState).toEqual({
      name: 'oliver',
      id: 1,
      searchUsers: [],
      otherProfile: {},
    });
  });

  it('should searchUsers', () => {
    const action = actions.searchUsersSuccess({ users: [{ name: 'oliver', id: 2 }] });
    const newState = profileReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      searchUsers: [{ name: 'oliver', id: 2 }],
    });
  });

  it('should updateProfile', () => {
    const action = actions.updateProfileSuccess({
      profile: {
        ...initialState,
        name: 'oliver',
        id: 1,
      },
    });
    const newState = profileReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      name: 'oliver',
      id: 1,
    });
  });

  it('should addFriend', () => {
    const action = actions.addFriendSuccess({ message: 'none', friend: { name: 'friemd' } });
    const newState = profileReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      friends: [{ name: 'friemd' }],
    });
  });

  it('should removeFriend', () => {
    const action = actions.removeFriendSuccess(
      {
        message: 'none',
      },
      { name: 'friemd', id: 1 },
    );
    const newState = profileReducer({
      ...initialState,
      friends: [{ name: 'friemd', id: 1 }],
    }, action);
    expect(newState).toEqual(initialState);
  });

  it('should removeFollower', () => {
    const action = actions.removeFollower({ name: 'friemd', id: 1 });
    const newState = profileReducer({
      ...initialState,
      followers: [{ name: 'friemd', id: 1 }],
    }, action);
    expect(newState).toEqual(initialState);
  });

  it('should addFollower', () => {
    const action = actions.addFollower({ name: 'friemd', id: 1 });
    const newState = profileReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      followers: [{ name: 'friemd', id: 1 }],
    });
  });
});
