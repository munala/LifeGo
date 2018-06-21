import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import NewInput from '../NewInput';
import BaseClass from './BaseClass';
import { setTime } from '../../../../utils';
import './styles.css';

class Comments extends BaseClass {
  state = {
    page: 0,
    comment: {
      content: '',
    },
    selectedComment: {
      id: '',
      content: '',
    },
    typing: false,
    submitting: false,
    editMode: false,
  }

  renderComments = ({ comments, mode, goToProfile }) => comments.map(comment => (
    <div key={comment.id} className="comment-container">
      <Avatar src={comment.userPictureUrl
        ? {
          uri: (comment.userPictureUrl.replace((
            comment.userPictureUrl.includes('https://')
            ? 'https://'
            : 'http://'), 'https://')),
        }
        : require('../../../../assets/images/user.png') // eslint-disable-line global-require
      }
      />
      <div className="comment-body">
        <div >
          <a href="#" onClick={() => goToProfile({ id: comment.senderId })} className="comment-user">
            {comment.user}
          </a>
          <div className="comment-content">
            {comment.content}
          </div>
        </div>
        <div className="time">
          {mode && `${setTime(comment).createdAt}${setTime(comment).time}`}
        </div>
      </div>

    </div>
  ));

  render() {
    const {
      bucketlist: {
        comments,
      }, goToProfile, mode,
    } = this.props;

    const {
      page, comment, submitting, editMode,
    } = this.state;

    const lastPage = Math.floor(comments.length / 8);

    return (
      <div className="comments-container">
        {
          comments.length > 0 && page > 0 &&
          <div onClick={() => this.navigatePage('previous')}>
            <a href="#">more comments</a>
          </div>
        }

        {this.renderComments({ comments, goToProfile, mode })}

        {
          comments.length > 0 && page < lastPage &&
          <div onClick={() => this.navigatePage('next')}>
            <a href="#">previous comments</a>
          </div>
        }
        <NewInput
          content={{ ...comment, type: 'comment' }}
          onChange={this.onChange}
          save={this.saveComment}
          submitting={submitting}
          buttonLabel={editMode ? 'save' : 'post'}
        />
      </div>
    );
  }
}

Comments.propTypes = {
  bucketlist: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      done: PropTypes.bool,
    })),
    comments: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string,
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })),
  }).isRequired,
  actions: PropTypes.shape({
    addComment:
    PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  mode: PropTypes.string,
  goToProfile: PropTypes.func.isRequired,
};

export default Comments;
