import * as types from './constants';
import messageService from './api';
import * as apiCallActions from '../Common/actions/apiCallActions';

export const sendMessageSuccess = message => ({
  type: types.SEND_MESSAGE,
  message: '',
  newMessage: message,
});

export const startConversationSuccess = conversation => ({
  type: types.START_CONVERSATION,
  conversation,
  message: '',
});

export const editMessageSuccess = message => ({
  type: types.EDIT_MESSAGE,
  message: '',
  newMessage: message,
});

export const deleteMessageSuccess = message => ({
  type: types.DELETE_MESSAGE,
  message: '',
  newMessage: message,
});

export const deleteConversationSuccess = ({ message, conversation }) => ({
  type: types.DELETE_CONVERSATION_SUCCESS,
  message,
  conversation,
});

export const getConversationsSuccess = ({ conversations, screen }) => ({
  type: types.GET_CONVERSATIONS_SUCCESS,
  message: '',
  conversations,
  screen,
});

export const sendMessage = message => async (dispatch) => {
  const response = await messageService.sendMessage(message);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (!response.error) {
    dispatch(sendMessageSuccess(response.data.createMessage));

    dispatch(apiCallActions.resetMessage());
  } else {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  }

  return response;
};

export const startConversation = conversation => async (dispatch) => {
  const response = await messageService.startConversation(conversation);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());

    return null;
  }

  dispatch(startConversationSuccess(response.data.startConversation));

  dispatch(apiCallActions.resetMessage());

  return response.data.startConversation;
};

export const updateMessage = message => async (dispatch) => {
  const response = await messageService.updateMessage(message);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (!response.error) {
    dispatch(editMessageSuccess(response.data.updateMessage));

    dispatch(apiCallActions.resetMessage());
  } else {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  }

  return response;
};

export const markAsRead = message => async (dispatch) => {
  const response = await messageService.updateMessage({
    ...message,
    read: true,
  });

  if (!response.error) {
    dispatch(editMessageSuccess(response.data.updateMessage));
  }

  return response;
};

export const deleteMessage = message => async (dispatch) => {
  const response = await messageService.deleteMessage(message);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteMessageSuccess(message));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const getConversations = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'messages' }));

  const response = await messageService.getConversations();

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'userAlerts',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getConversationsSuccess({
      conversations: response.data.getConversations,
      screen: 'messages',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteConversation = conversation => async (dispatch) => {
  const response = await messageService.deleteConversation(conversation);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteConversationSuccess({ ...response.data.deleteConversation, conversation }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
