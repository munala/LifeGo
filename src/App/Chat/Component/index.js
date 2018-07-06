import React from 'react';
import Icon from '@material-ui/core/Icon';

import BaseClass from './BaseClass';
import Conversation from '../Conversation';
import ConversationRow from '../ConversationRow';
import NewConversation from '../NewConversation';
import OutlinedButton from '../../Common/components/OutlinedButton';
import Dialog from '../../Common/components/Dialog';
import propTypes from './propTypes';
import styles from '../styles';
import '../styles.css';

class Chat extends BaseClass {
  state = {
    conversation: {},
    selectedConversation: {},
    hoveredConversation: {},
    newConversation: false,
  }

  renderConversations = conversations => conversations.map((conversation) => {
    const { profile } = this.props;
    const {
      hoveredConversation,
      anchorEl,
      selectedConversation,
    } = this.state;

    const conversationRowProps = {
      profile,
      conversation,
      hoveredConversation,
      anchorEl,
      selectedConversation,
      handleClose: this.handleClose,
      selectItem: this.selectItem,
      getUnreadCount: this.getUnreadCount,
      setPictureUrl: this.setPictureUrl,
      hoverConversation: this.hoverConversation,
      selectConversation: this.selectConversation,
      getName: this.getName,
      handleClick: this.handleClick,
    };

    return <ConversationRow key={conversation.id} {...conversationRowProps} />;
  })

  render() {
    const {
      conversations, onClose, profile, actions, history, searchResults,
    } = this.props;

    const {
      conversation: chat, showDialog, selectedConversation, newConversation,
    } = this.state;

    if (chat.senderId) {
      const [conversation] = conversations.filter(convo => (
        convo.senderId === chat.senderId &&
        convo.receiverId === chat.receiverId
      ));

      return (
        <Conversation
          profile={profile}
          history={history}
          conversation={conversation || chat}
          actions={actions}
          onClose={onClose}
          selectConversation={this.selectConversation}
        />
      );
    }

    if (newConversation) {
      return (
        <NewConversation
          profile={profile}
          onClose={onClose}
          conversations={conversations}
          searchUsers={actions.searchUsers}
          searchResults={searchResults}
          setPictureUrl={this.setPictureUrl}
          getName={this.getName}
          closeNewConversation={this.closeNewConversation}
          selectConversation={this.selectConversation}
        />
      );
    }

    return (
      <div className="chat-container" >
        <div className="chat-header" >
          <div className="chat-header-title">Direct Messages</div>
          <div className="chat-header-right">
            <div className="chat-mark-all" onClick={this.markAllAsRead}>Mark All as Read</div>
            <OutlinedButton label="new message" onClick={this.openNewConversation} />
            <Icon onClick={onClose} style={styles.closeIcon}>close</Icon>
          </div>
        </div>
        {
          showDialog &&
          <Dialog
            type="conversation"
            message="Are you sure you want to delete this conversation?"
            onConfirm={() => this.delete(selectedConversation)}
            onCancel={this.closeDialog}
          />
        }
        <div className="chat-list">
          {this.renderConversations(conversations)}
        </div>
        {
          conversations.length === 0 &&
          <div className="no-messages">Conversations will appear here.</div>
        }
      </div>
    );
  }
}

Chat.propTypes = propTypes;

export default Chat;
