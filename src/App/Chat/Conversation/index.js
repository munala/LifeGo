import React from 'react';
import Icon from '@material-ui/core/Icon';

import BaseClass from './BaseClass';
import Avatar from '../../Common/components/Avatar';
import NewInput from '../../Common/components/NewInput';
import Dialog from '../../Common/components/Dialog';

import propTypes from './propTypes';
import avatar from '../../../assets/images/user.png';
import { setTime } from '../../../utils';
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

  renderMessages = messages => messages.map((message, i) => {
    const { createdAt, time } = setTime(message);

    const { profile } = this.props;

    const { hoveredMessage, selectedMessage, showDialog } = this.state;

    const dateTime = `${createdAt}${time}  ${
      message.senderId === profile.id ? `✔${message.read ? '✔' : ''}` : ''
    }`;

    return (
      <div
        key={message.id}
        onMouseEnter={() => this.hoverMessage(message)}
        onMouseLeave={() => this.hoverMessage(message)}
        className={`message-container-content${
          message.senderId === profile.id ? ' message-container-sender' : ''
        }`}
      >
        <div className={`message-top-content${
          message.senderId === profile.id ? ' message-top-sender' : ''
        }`}
        >
          {
            hoveredMessage.id === message.id && message.senderId === profile.id ?
              <i
                className="material-icons message-delete-icon"
                onClick={() => this.deleteMessage(message)}
              >delete
              </i> :
              <div className="message-delete-icon" />
          }
          <div style={this.setStyle(message, profile)} className="message-content" >
            {message.content}
          </div>
          <Avatar
            src={message.pictureUrl || avatar}
            style={{
              display: 'flex',
              width: 30,
              height: 30,
              margin: 5,
            }}
          />
        </div>
        <div className="message-time">{dateTime}</div>
        {
          showDialog && selectedMessage.id === message.id &&
          <Dialog
            type="message"
            message="Are you sure you want to delete this message?"
            onConfirm={() => this.delete(message)}
            onCancel={this.closeDialog}
          />
        }
      </div>
    );
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
            style={{ color: '#777', cursor: 'pointer' }}
          >chevron_left
          </Icon>
          <div className="conversation-header">
            <Avatar
              src={pictureUrl || avatar}
              style={{
                display: 'flex',
                width: 40,
                height: 40,
                margin: 10,
              }}
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
