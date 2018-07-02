import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

import SnackBarComponent from '../SnackBarComponent';
import Avatar from '../Avatar';
import NewInput from '../NewInput';
import BaseClass from './BaseClass';
import avatar from '../../../../assets/images/user.png';
import { setTime } from '../../../../utils';
import './styles.css';

const ITEM_HEIGHT = 48;

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
    deletedComment: {},
    typing: false,
    submitting: false,
    editMode: false,
    snackOpen: false,
    hoveredComment: {},
  }

  renderComments = ({ comments, mode, goToProfile }) => comments
    .filter(comment => comment.id !== this.state.deletedComment.id)
    .slice(this.state.page * 8, (this.state.page * 8) + 8)
    .map((comment) => {
      const { bucketlist, profile } = this.props;
      const menuItems = comment.senderId === profile.id ? ['Edit', 'Delete'] : ['Delete'];
      const {
        anchorEl, selectedComment, snackOpen, hoveredComment,
      } = this.state;

      return (
        <div
          key={comment.id}
          className="comment-container"
          onMouseEnter={() => this.hover(comment)}
          onMouseLeave={() => this.hover(comment)}
        >
          <Avatar
            src={comment.userPictureUrl
              ? comment.userPictureUrl
              : avatar // eslint-disable-line global-require
            }
            style={{ display: 'flex', height: 30, width: 30 }}
          />
          <div className="comment">
            <div className="comment-left">
              <div className="comment-body">
                <span onClick={() => goToProfile({ id: comment.senderId })} className="comment-user">
                  {comment.user}
                </span>
                <span className="comment-content">
                  {comment.content}
                </span>
              </div>
              {
                (bucketlist.userId === profile.id || comment.senderId === profile.id)
                && !snackOpen && hoveredComment.id === comment.id ?
                  <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    style={{ maxHeight: 20, alignSelf: 'center' }}
                    onClick={event => this.handleClick({ event, selectedComment: comment })}
                  >
                    <MoreHorizIcon style={{ color: '#444' }} />
                  </IconButton> :
                  <div className="icon-placeholder" />
              }
              {
                selectedComment.id === comment.id &&
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                  }}
                >
                  {menuItems.map(menuItem => (
                    <MenuItem key={menuItem} onClick={() => this.selectComment({ menuItem })}>
                      {menuItem}
                    </MenuItem>
                  ))}
                </Menu>
              }
            </div>
            <div className="time">
              {mode && `${setTime(comment).createdAt}${setTime(comment).time}`}
            </div>
          </div>
        </div>
      );
    });

  render() {
    const {
      bucketlist: {
        comments,
      }, goToProfile, mode, profile,
    } = this.props;

    const {
      page, comment, submitting, editMode, snackOpen, deletedComment,
    } = this.state;

    const { length } = comments.filter(comm => comm.id !== deletedComment.id);

    const lastPage = Math.floor(comments.length / 8);

    return (
      <div className="comments-container">
        <div className="comments">
          {
            length > 0 && page > 0 &&
            <div className="nav-link" onClick={() => this.navigatePage('previous')}>
              <a href="#">more comments</a>
            </div>
          }

          {this.renderComments({ comments, goToProfile, mode })}

          {
            length > 0 && page < lastPage &&
            <div className="nav-link" onClick={() => this.navigatePage('next')}>
              <a href="#">previous comments</a>
            </div>
          }
        </div>
        <NewInput
          name="comment"
          pictureUrl={profile.pictureUrl}
          content={{ ...comment, type: 'comment' }}
          onChange={this.onChange}
          save={this.saveComment}
          submitting={submitting}
          buttonLabel={editMode ? 'save' : 'post'}
        />
        <SnackBarComponent
          open={snackOpen}
          message={{
            content: `You have deleted ${deletedComment && deletedComment.user}'s comment`,
            success: true,
          }}
          closeSnackBar={this.cancel}
          undo="undo"
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
    comments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      done: PropTypes.bool,
    })),
    items: PropTypes.arrayOf(PropTypes.shape({
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
