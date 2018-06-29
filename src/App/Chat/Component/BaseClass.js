/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  getUnreadCount = conversation => conversation.messages
    .filter(message => !message.read && message.receiverId === this.props.profile.id)
    .length


  setPictureUrl = (conversation) => {
    if (this.props.profile.id !== conversation.receiverId) {
      return conversation.receiverPictureUrl;
    }
    return conversation.senderPictureUrl;
  }

  getName = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverDisplayName;
    }
    return conversation.senderDisplayName;
  }

  markAllAsRead = () => {
    this.props.conversations.forEach((conversation) => {
      this.markAsRead(conversation);
    });
  }

  markAsRead = (conversation) => {
    conversation.messages.forEach((message) => {
      if (!message.read) {
        this.props.actions.markAsRead(message);
      }
    });
  }

  selectConversation = (conversation) => {
    this.setState({
      conversation: this.state.conversation.senderId === conversation.senderId ? {} : conversation,
      hoveredConversation: {},
      newConversation: false,
    });
  }

  deleteConversation = () => {
    this.setState({
      showDialog: true,
    });
  }

  delete = (conversation) => {
    this.closeDialog();
    this.props.actions.deleteConversation(conversation);
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
      selectedConversation: {},
    });
  }

  handleClick = ({ event, selectedConversation }) => {
    this.setState({
      selectedConversation,
      anchorEl: event.currentTarget,
    });
  };

  hoverConversation = (hoveredConversation) => {
    this.setState({
      hoveredConversation: hoveredConversation.id === this.state.hoveredConversation.id ?
        {} :
        hoveredConversation,
    });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  selectItem = ({ menuItem }) => {
    this.setState({ hoveredConversation: {} });
    const { selectedConversation } = this.state;
    const actions = {
      'Mark as Read': () => this.markAsRead(selectedConversation),
      Delete: () => this.deleteConversation(selectedConversation),
    };
    actions[menuItem]();
    this.handleClose();
  }

  openNewConversation = () => {
    this.setState({ newConversation: true });
  }

  closeNewConversation = () => {
    this.setState({ newConversation: false });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
