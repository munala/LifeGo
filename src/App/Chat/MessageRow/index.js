import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../Common/components/Dialog';

import Avatar from '../../Common/components/Avatar';
import { setTime } from '../../../utils';
import avatar from '../../../assets/images/user.png';
import styles from '../styles';
import '../styles.css';

const MessageRow = ({
  message,
  profile,
  hoverMessage,
  hoveredMessage,
  deleteMessage,
  setStyle,
  showDialog,
  selectedMessage,
  closeDialog,
  delete: confirmDelete,
}) => {
  const { createdAt, time } = setTime(message);

  const dateTime = `${createdAt}${time}  ${
    message.senderId === profile.id ? `✔${message.read ? '✔' : ''}` : ''
  }`;

  return (
    <div
      key={message.id}
      onMouseEnter={() => hoverMessage(message)}
      onMouseLeave={() => hoverMessage(message)}
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
              onClick={() => deleteMessage(message)}
            >
              delete
            </i> :
            <div className="message-delete-icon" />
        }
        <div style={setStyle(message, profile)} className="message-content" >
          {message.content}
        </div>
        <Avatar
          src={message.pictureUrl || avatar}
          style={styles.messageAvatar}
        />
      </div>
      <div className="message-time">{dateTime}</div>
      {
        showDialog && selectedMessage.id === message.id &&
        <Dialog
          type="message"
          message="Are you sure you want to delete this message?"
          onConfirm={() => confirmDelete(message)}
          onCancel={closeDialog}
        />
      }
    </div>
  );
};

MessageRow.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  hoverMessage: PropTypes.func.isRequired,
  hoveredMessage: PropTypes.shape({}).isRequired,
  deleteMessage: PropTypes.func.isRequired,
  setStyle: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  selectedMessage: PropTypes.shape({}).isRequired,
  closeDialog: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

export default MessageRow;
