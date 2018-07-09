import profileReducer from '../reducer';
import * as actions from '../actions';

const initialState = {
  followers: [],
  friends: [],
  searchUsers: [],
};

describe('Settings reducer', () => {
  it('should getProfile', () => {
    const data = {
      profile: {
        id: 1,
        name: 'oliver',
      },
      message: '',
      screen: 'settings',
    };
    const action = actions.getProfileSuccess(data);
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
