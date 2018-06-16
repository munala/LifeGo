import profileReducer from '../reducer';
import * as actions from '../actions';

const initialState = {
  followers: [],
  friends: [],
  searchUsers: [],
};

describe('Settings reducer', () => {
  it('should getProfile', () => {
    const action = actions.getProfileSuccess({ profile: { name: 'oliver', id: 1 } });
    const newState = profileReducer(initialState, action);

    expect(newState).toEqual({
      name: 'oliver',
      id: 1,
      searchUsers: [],
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
});
