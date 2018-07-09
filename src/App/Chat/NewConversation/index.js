import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import Avatar from '../../Common/components/Avatar';
import avatar from '../../../assets/images/user.png';
import styles from '../styles';
import '../styles.css';

class NewConversation extends Component {
  state = {
    searchText: '',
  }

  onChange = ({ target: { value } }) => {
    this.setState({ searchText: value });
    this.props.searchUsers(value);
  }

  startConversation = async (receiver) => {
    const conversation = {
      senderId: this.props.profile.id,
      senderDisplayName: this.props.profile.displayName,
      senderUsername: this.props.profile.username,
      senderPictureUrl: this.props.profile.pictureUrl,
      receiverId: receiver.id,
      receiverPictureUrl: receiver.pictureUrl,
      receiverUsername: receiver.username,
      receiverDisplayName: receiver.displayName,
      messages: [],
    };

    this.props.selectConversation(conversation);
  }

  renderRecents = conversations => conversations.map(conversation => (
    <div
      key={conversation.id}
      className="chat-list-item new-conversation-item"
    >
      <Avatar
        src={this.props.setPictureUrl(conversation) || avatar}
        style={styles.newConversationAvatar}
        onClick={() => this.props.selectConversation(conversation)}
      />
      <div
        className="chat-item-user new-conversation-user"
        onClick={() => this.props.selectConversation(conversation)}
      >
        {this.props.getName(conversation)}
      </div>
    </div>
  ))

  renderResults = users => users.map(user => (
    <div
      key={user.id}
      className="chat-list-item new-conversation-item"
      onClick={() => this.startConversation(user)}
    >
      <Avatar
        src={user.pictureUrl || avatar}
        style={styles.resultsAvatar}
      />
      <div className="chat-item-user new-conversation-user" >
        {user.displayName}
      </div>
    </div>
  ))

  render() {
    const {
      onClose, closeNewConversation, conversations, searchResults,
    } = this.props;

    const { searchText } = this.state;

    return (
      <div className="chat-container new-chat-container">
        <div className="chat-header" >
          <Icon
            onClick={closeNewConversation}
            style={styles.headerIcons}
          >
            chevron_left
          </Icon>
          <div className="chat-header-title">New Message</div>
          <Icon
            onClick={onClose}
            style={styles.headerIcons}
          >
            close
          </Icon>
        </div>
        <div className="search-user-container new-conversation-body">
          <div className="recipient-label">Send message to:</div>
          <TextField
            autoFocus
            name="recipient"
            className="recipient-input"
            placeholder="Enter a name"
            value={searchText}
            onChange={this.onChange}
          />
          <div className="recipient-label recent-label">{searchText ? 'People' : 'Recent'}</div>
        </div>
        <div className={`chat-list${searchText ? ' new-chat-list' : ''}`}>
          {!searchText && this.renderRecents(conversations) }
          {searchText && this.renderResults(searchResults) }
        </div>
      </div>
    );
  }
}

NewConversation.propTypes = {
  onClose: PropTypes.func.isRequired,
  closeNewConversation: PropTypes.func.isRequired,
  conversations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string,
    pictureUrl: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string,
    pictureUrl: PropTypes.string,
  }).isRequired).isRequired,
  searchUsers: PropTypes.func.isRequired,
  selectConversation: PropTypes.func.isRequired,
  setPictureUrl: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
};

export default NewConversation;
