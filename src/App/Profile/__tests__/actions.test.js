import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as profileActions from '../actions';
import * as profileConstants from '../constants';
import * as commonConstants from '../../Common/constants';

const types = { ...profileConstants, ...commonConstants };

jest.mock('../api', (() => ({
  getProfile: () => Promise.resolve('dfknefenfiefnef'),
  getOtherProfile: () => Promise.resolve('dfknefenfiefnef'),
  updateProfile: () => Promise.resolve('dfknefenfiefnef'),
  searchUsers: () => Promise.resolve({ users: [] }),
  addFriend: () => Promise.resolve('dfknefenfiefnef'),
  removeFriend: () => Promise.resolve('dfknefenfiefnef'),
})));

describe('Auth actions', () => {
  it('should create a GET_PROFILE_SUCCESS action', () => {
    const data = {
      profile: {
        name: 'oliver',
        email: 'login',
      },
      screen: 'profile',
    };

    const expectedAction = {
      ...data,
      type: types.GET_PROFILE_SUCCESS,
      message: '',
      screen: 'profile',
    };

    const action = profileActions.getProfileSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a GET_OTHER_PROFILE_SUCCESS action', () => {
    const data = {
      profile: {
        name: 'oliver',
        email: 'login',
      },
      screen: 'profile',
    };

    const expectedAction = {
      ...data,
      message: '',
      type: types.GET_OTHER_PROFILE_SUCCESS,
    };

    const action = profileActions.getOtherProfileSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a SEARCH_USERS action', () => {
    const data = {
      users: [],
    };
    const expectedAction = {
      ...data,
      type: types.SEARCH_USERS,
    };

    const action = profileActions.searchUsersSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a UPDATE_PROFILE_SUCCESS action', () => {
    const data = {
      profile: {
        name: 'oliver',
        email: 'login',
      },
      screen: 'profile',
    };

    const expectedAction = {
      ...data,
      message: 'Success',
      type: types.UPDATE_PROFILE_SUCCESS,
    };

    const action = profileActions.updateProfileSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a ADD_FRIEND action', () => {
    const data = {
      friend: {
        name: 'oliver',
        email: 'login',
      },
      message: 'profile',
    };
    const expectedAction = {
      ...data,
      type: types.ADD_FRIEND,
      screen: 'others',
    };

    const action = profileActions.addFriendSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a REMOVE_FRIEND action', () => {
    const data = {
      friend: {
        name: 'oliver',
        email: 'login',
      },
      message: 'profile',
    };
    const expectedAction = {
      ...data,
      screen: 'others',
      type: types.REMOVE_FRIEND,
    };

    const action = profileActions.removeFriendSuccess({ message: data.message }, data.friend);

    expect(action).toEqual(expectedAction);
  });
  it('should create a REMOVE_FOLLOWER action', () => {
    const data = {
      follower: {
        name: 'oliver',
        email: 'login',
      },
    };
    const expectedAction = {
      ...data,
      type: types.REMOVE_FOLLOWER,
      message: '',
    };

    const action = profileActions.removeFollower((data.follower));

    expect(action).toEqual(expectedAction);
  });
  it('should create a ADD_FOLLOWER action', () => {
    const data = {
      follower: {
        name: 'oliver',
        email: 'login',
      },
    };
    const expectedAction = {
      ...data,
      message: '',
      type: types.ADD_FOLLOWER,
    };

    const action = profileActions.addFollower((data.follower));

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async calls', () => {
  it(
    'GET_PROFILE_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.GET_PROFILE_SUCCESS,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(profileActions.getProfile()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.GET_PROFILE_SUCCESS);
        done();
      });
    },
  );
  it(
    'GET_OTHER_PROFILE_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.GET_OTHER_PROFILE_SUCCESS,
          body: {
            id: 1,
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(profileActions.getOtherProfile(1)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.GET_OTHER_PROFILE_SUCCESS);
        done();
      });
    },
  );
  it(
    'UPDATE_PROFILE_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.UPDATE_PROFILE_SUCCESS,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ otherProfile: {}, expectedActions });
      store.dispatch(profileActions.updateProfile(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.UPDATE_PROFILE_SUCCESS);
        done();
      });
    },
  );
  it(
    'ADD_FRIEND when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.ADD_FRIEND,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(profileActions.addFriend(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.ADD_FRIEND);
        done();
      });
    },
  );
  it(
    'REMOVE_FRIEND when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.REMOVE_FRIEND,
          body: {
            name: 'oliver',
            email: 'login',
          },
        },
      ];

      const store = mockStore({ profile: {}, expectedActions });
      store.dispatch(profileActions.removeFriend(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.REMOVE_FRIEND);
        done();
      });
    },
  );
  it(
    'SEARCH_USERS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.SEARCH_USERS,
          users: [],
        },
      ];

      const store = mockStore({ searchUsers: [], expectedActions });
      store.dispatch(profileActions.searchUsers('oliver')).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.SEARCH_USERS);
        done();
      });
    },
  );
});
