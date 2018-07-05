import React from 'react';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import BaseClass from './BaseClass';
import Conversation from '../Conversation';
import NewConversation from '../NewConversation';
import OutlinedButton from '../../Common/components/OutlinedButton';
import Avatar from '../../Common/components/Avatar';
import Dialog from '../../Common/components/Dialog';
import { setTime } from '../../../utils';
import avatar from '../../../assets/images/user.png';
import propTypes from './propTypes';
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
    const { selectedConversation, hoveredConversation, anchorEl } = this.state;
    const unread = this.getUnreadCount(conversation);
    const pictureUrl = this.setPictureUrl(conversation);
    let createdAtDate = '';
    let createdAttime = '';

    if (conversation.messages.length > 0) {
      const timeData = setTime(conversation.messages[0]);
      const { createdAt } = timeData;
      createdAtDate = createdAt;
      const { time } = timeData;
      createdAttime = time;
    }

    const dateTime = `${createdAtDate}${createdAttime}`;
    const menuItems = ['Mark as Read', 'Delete'];
    const menuItemsRead = ['Delete'];

    return (
      <div
        key={conversation.id}
        className={`chat-list-item${unread > 0 ? ' chat-unread' : ''}`}
        onMouseEnter={() => this.hoverConversation(conversation)}
        onMouseLeave={() => this.hoverConversation(conversation)}
      >
        <Avatar
          src={pictureUrl || avatar}
          style={{
            display: 'flex',
            width: 60,
            height: 60,
          }}
          onClick={() => this.selectConversation(conversation)}
        />
        <div
          className="chat-item-right"
          onClick={() => this.selectConversation(conversation)}
        >
          <div className="chat-item-top-row">
            <div className="chat-item-user">{this.getName(conversation)}</div>
            <div className="chat-item-time">{dateTime}</div>
          </div>
          <div className="chat-item-recent">
            {
              conversation.messages.length > 0 ?
              `${
                conversation.messages[0].senderId === profile.id ? 'You: ' : ''
              }${conversation.messages[0].content}` :
              '- no messages -'
            }
          </div>
        </div>
        {
          hoveredConversation.id === conversation.id ?
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={event => this.handleClick({ event, selectedConversation: conversation })}
            >
              <MoreVertIcon style={{ color: '#444' }} />
            </IconButton> :
            <div className="icon-placeholder" />
        }
        {
          selectedConversation.id === conversation.id && anchorEl &&
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            PaperProps={{
            style: {
              paddingLeft: 10,
              paddingRight: 10,
            },
          }}
          >
            {(unread > 0 ? menuItems : menuItemsRead).map(menuItem => (
              <MenuItem key={menuItem} onClick={() => this.selectItem({ menuItem })}>
                {menuItem}
              </MenuItem>
          ))}
          </Menu>
        }
      </div>
    );
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
            <Icon onClick={onClose} style={{ color: '#777', cursor: 'pointer' }}>close</Icon>
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
