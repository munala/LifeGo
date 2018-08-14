import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import Avatar from '../../Common/components/Avatar';
import { setTime } from '../../../utils';
import avatar from '../../../assets/images/user.png';
import styles from '../styles';

const ConversationRow = ({
  profile,
  getUnreadCount,
  conversation,
  setPictureUrl,
  hoverConversation,
  hoveredConversation,
  selectConversation,
  getName,
  anchorEl,
  handleClick,
  selectedConversation,
  handleClose,
  selectItem,
}) => {
  const unread = getUnreadCount(conversation);
  const pictureUrl = setPictureUrl(conversation);
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
      onMouseEnter={() => hoverConversation(conversation)}
      onMouseLeave={() => hoverConversation(conversation)}
    >
      <Avatar
        src={pictureUrl || avatar}
        style={styles.conversationAvatar}
        onClick={() => selectConversation(conversation)}
      />
      <div
        className="chat-item-right"
        onClick={() => selectConversation(conversation)}
      >
        <div className="chat-item-top-row">
          <div className="chat-item-user">{getName(conversation)}</div>
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
            onClick={event => handleClick({ event, selectedConversation: conversation })}
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
          onClose={handleClose}
          PaperProps={{
          style: styles.menu,
        }}
        >
          {(unread > 0 ? menuItems : menuItemsRead).map(menuItem => (
            <MenuItem key={menuItem} onClick={() => selectItem({ menuItem })}>
              {menuItem}
            </MenuItem>
        ))}
        </Menu>
      }
    </div>
  );
};

ConversationRow.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  getUnreadCount: PropTypes.func.isRequired,
  conversation: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  setPictureUrl: PropTypes.func.isRequired,
  hoverConversation: PropTypes.func.isRequired,
  hoveredConversation: PropTypes.shape({}).isRequired,
  selectConversation: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedConversation: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
};

ConversationRow.defaultProps = {
  anchorEl: null,
};

export default ConversationRow;
