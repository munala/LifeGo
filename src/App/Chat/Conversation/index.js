import React from 'react';
import Icon from '@material-ui/core/Icon';

import BaseClass from './BaseClass';
import Avatar from '../../Common/components/Avatar';
import NewInput from '../../Common/components/NewInput';
import MessageRow from '../MessageRow';
import propTypes from './propTypes';
import avatar from '../../../assets/images/user.png';
import styles from '../styles';
import '../styles.css';

class Conversation extends BaseClass {
  state = {
    conversation: this.props.conversation,
    message: {
      content: '',
    },
    selectedMessage: {},
    hoveredMessage: {},
    editMode: false,
    showDialog: false,
    submitting: false,
  }

  componentDidMount = () => {
    this.props.conversation.messages.forEach((message) => {
      if (!message.read) {
        this.props.actions.markAsRead(message);
      }
    });
  }

  renderMessages = messages => messages.map((message, i) => {
    const { profile } = this.props;

    const { hoveredMessage, selectedMessage, showDialog } = this.state;

    const messageRowProps = {
      message,
      profile,
      hoveredMessage,
      showDialog,
      selectedMessage,
      hoverMessage: this.hoverMessage,
      deleteMessage: this.deleteMessage,
      setStyle: this.setStyle,
      closeDialog: this.closeDialog,
      delete: this.delete,
    };

    return <MessageRow key={message.id} {...messageRowProps} />;
  })

  render() {
    const {
      selectConversation, onClose, profile, conversation,
    } = this.props;
    const {
      message, submitting, editMode,
    } = this.state;
    const pictureUrl = this.setPictureUrl(conversation);
    const name = this.getName(conversation);

    return (
      <div className="chat-container" >
        <div className="chat-header" >
          <Icon
            onClick={() => selectConversation(conversation)}
            style={styles.arrowBack}
          >
            chevron_left
          </Icon>
          <div className="conversation-header">
            <Avatar
              src={pictureUrl || avatar}
              style={styles.messageHeaderAvatar}
            />
            <div className="chat-header-title" onClick={this.goToProfile}>{name}</div>
          </div>
          <Icon
            onClick={onClose}
            style={{ color: '#777', cursor: 'pointer' }}
          >close
          </Icon>
        </div>
        {
          conversation.messages.length === 0 &&
          <div className="no-messages">This is the start of your conversation with {name}.</div>
        }
        <div className="chat-list message-list">
          {this.renderMessages(conversation.messages)}
        </div>
        <div className="new-message">
          <NewInput
            name="message"
            pictureUrl={profile.pictureUrl}
            content={{ ...message, type: 'message' }}
            onChange={this.onChange}
            save={this.onSubmit}
            submitting={submitting}
            buttonLabel={editMode ? 'save' : 'send'}
          />
        </div>
      </div>
    );
  }
}

Conversation.propTypes = propTypes;

export default Conversation;
