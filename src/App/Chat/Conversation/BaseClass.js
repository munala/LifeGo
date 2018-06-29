/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  onChange = ({ target: { value } }) => {
    this.setState({
      message: {
        ...this.state.message,
        content: value,
      },
    });
  }

  onSubmit = async () => {
    const { conversation } = this.props;
    let newConversation;

    if (!conversation.id) {
      newConversation = await this.props.actions.startConversation(conversation);
    }

    this.setState(
      { submitting: true },
      async () => {
        const { message } = this.state;
        if (message.content) {
          this.sendMessage({
            message,
            conversation: newConversation || conversation,
          });
        }
      },
    );
  }

  getName = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverDisplayName;
    }
    return conversation.senderDisplayName;
  }

  getId = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverId;
    }
    return conversation.senderId;
  }

  setStyle= ({ senderId }, { id }) => ({
    color: (senderId === id) ? '#fff' : '#666',
    backgroundColor: (senderId === id) ? '#00bcd4' : '#f7f7f7',
  })

  setPictureUrl = (conversation) => {
    if (this.props.profile.id !== conversation.receiverId) {
      return conversation.receiverPictureUrl;
    }
    return conversation.senderPictureUrl;
  }

  saveMessage = async () => {
    if (this.state.editMode === true) {
      const response = await this.props.actions.updateMessage(this.state.message);

      if (!response.error) {
        this.setState({
          editMode: false,
          message: { content: '' },
          selectedMessage: {},
        });
      }
    } else {
      this.onSubmit();
    }
  }

  sendMessage = ({ message, conversation }) => {
    if (message.content) {
      this.props.actions.sendMessage({
        ...message,
        senderId: this.props.profile.id === conversation.senderId ?
          conversation.senderId :
          conversation.receiverId,
        receiverId: this.props.profile.id !== conversation.senderId ?
          conversation.senderId :
          conversation.receiverId,
        conversationId: conversation.id,
      });
      this.setState({
        message: {
          content: '',
        },
        submitting: false,
      });
    }
  }

  goToProfile = async () => {
    const userId = this.getId(this.props.conversation);
    const { history: { push } } = this.props;

    this.props.onClose();

    push(`profile/${userId}`);
  }

  delete = async (message) => {
    this.closeDialog();
    this.props.actions.deleteMessage(message);
  }

  deleteMessage = (selectedMessage) => {
    this.setState({
      showDialog: true,
      selectedMessage,
    });
  }

  closeDialog = () => {
    this.setState({
      showDialog: true,
      selectedMessage: {},
    });
  }

  hoverMessage = (hoveredMessage) => {
    this.setState({
      hoveredMessage: this.state.hoveredMessage.id === hoveredMessage.id ? {} : hoveredMessage,
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
