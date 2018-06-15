import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as chatActions from '../actions';
import * as chatConstants from '../constants';
import * as commonConstants from '../../Common/constants';

const types = { ...commonConstants, ...chatConstants };

jest.mock('../api', (() => ({
  sendMessage: () => Promise.resolve('dfknefenfiefnef'),
  startConversation: () => Promise.resolve('dfknefenfiefnef'),
  updateMessage: () => Promise.resolve('dfknefenfiefnef'),
  markAsRead: () => Promise.resolve('dfknefenfiefnef'),
  deleteMessage: () => Promise.resolve('dfknefenfiefnef'),
  getConversations: () => Promise.resolve('dfknefenfiefnef'),
  deleteConversation: () => Promise.resolve('dfknefenfiefnef'),
})));

describe('Chat action creators', () => {
  it('should create a SEND_MESSAGE action', () => {
    const data = {
      message: {
        content: 'oliver',
      },
    };
    const expectedAction = {
      newMessage: data,
      message: '',
      type: types.SEND_MESSAGE,
    };

    const action = chatActions.sendMessageSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a START_CONVERSATION action', () => {
    const data = {
      screen: 'chat',
      message: {
        content: 'oliver',
      },
    };

    const expectedAction = {
      conversation: data,
      message: '',
      type: types.START_CONVERSATION,
    };

    const action = chatActions.startConversationSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a EDIT_MESSAGE action', () => {
    const data = {
      screen: 'chat',
      message: {
        content: 'oliver',
      },
    };
    const expectedAction = {
      newMessage: data,
      message: '',
      type: types.EDIT_MESSAGE,
    };

    const action = chatActions.editMessageSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a DELETE_MESSAGE action', () => {
    const data = {
      message: {
        content: 'oliver',
      },
      screen: 'chat',
    };
    const expectedAction = {
      newMessage: data,
      message: '',
      type: types.DELETE_MESSAGE,
    };

    const action = chatActions.deleteMessageSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a DELETE_CONVERSATION_SUCCESS action', () => {
    const data = {
      message: 'success',
      conversation: {},
    };
    const expectedAction = {
      ...data,
      type: types.DELETE_CONVERSATION_SUCCESS,
    };

    const action = chatActions.deleteConversationSuccess((data));

    expect(action).toEqual(expectedAction);
  });
  it('should create a GET_CONVERSATIONS_SUCCESS action', () => {
    const data = {
      conversations: [],
      screen: 'chat',
    };
    const expectedAction = {
      ...data,
      message: '',
      type: types.GET_CONVERSATIONS_SUCCESS,
    };

    const action = chatActions.getConversationsSuccess((data));

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async calls', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(
    'SEND_MESSAGE',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.SEND_MESSAGE,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(chatActions.sendMessage(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.SEND_MESSAGE);
        done();
      });
    },
  );
  it(
    'START_CONVERSATION',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.START_CONVERSATION,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(chatActions.startConversation(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.START_CONVERSATION);
        done();
      });
    },
  );
  it(
    'EDIT_MESSAGE when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.EDIT_MESSAGE,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(chatActions.updateMessage(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.EDIT_MESSAGE);
        done();
      });
    },
  );
  it(
    'DELETE_MESSAGE when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.DELETE_MESSAGE,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(chatActions.deleteMessage(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.DELETE_MESSAGE);
        done();
      });
    },
  );
  it(
    'DELETE_CONVERSATION_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.DELETE_CONVERSATION_SUCCESS,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(chatActions.deleteConversation(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.DELETE_CONVERSATION_SUCCESS);
        done();
      });
    },
  );
  it(
    'EDIT_MESSAGE when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.EDIT_MESSAGE,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(chatActions.markAsRead(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.EDIT_MESSAGE);
        done();
      });
    },
  );
  it(
    'GET_CONVERSATIONS_SUCCESS when logging in',
    (done) => {
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.GET_CONVERSATIONS_SUCCESS,
          body: {
            message: { content: 'there' },
          },
        },
      ];

      const store = mockStore({ conversations: [], expectedActions });
      store.dispatch(chatActions.getConversations(expectedActions[1].body)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
        expect(actions[1].type).toEqual(types.GET_CONVERSATIONS_SUCCESS);
        done();
      });
    },
  );
});
