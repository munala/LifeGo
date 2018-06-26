/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  onChange = ({ target: { value } }) => {
    this.setState({
      comment: {
        ...this.state.comment,
        content: value,
      },
    });
  }

  onSubmit = async () => {
    const { comment } = this.state;
    this.setState(() => ({ submitting: true }));
    if (comment.content) {
      const { error } = await this.props.actions.addComment(this.props.bucketlist, comment);
      this.setState(() => ({ submitting: false }));
      if (!error) {
        this.setState(() => ({
          comment: {
            id: '',
            content: '',
          },
        }));
        this.setState(() => ({ typing: false }));
      }
    }
  }

  navigatePage = (direction) => {
    this.setState({
      page: this.state.page + (direction === 'next' ? 1 : -1),
    });
  }

  delete = () => {
    this.props.actions.deleteComment(
      this.props.bucketlist,
      this.state.selectedComment,
    );
  }

  focus = () => {
    this.setState({ typing: true });
  }

  editComment = () => {
    this.closeMenu();
    this.setState({
      comment: this.state.selectedComment,
      editMode: true,
      typing: true,
    });
  }

  cancel = () => {
    clearTimeout(this.timeout);
    this.setState({
      comment: {
        id: '',
        content: '',
      },
      editMode: false,
      snackOpen: false,
      deletedComment: { },
      selectedComment: {},
    });
  }

  saveComment = async () => {
    if (this.state.editMode) {
      const response = await this.props.actions.updateComment(
        this.props.bucketlist,
        this.state.comment,
      );
      if (!response.error) {
        this.setState({
          editMode: false,
          typing: false,
          comment: { content: '' },
          selectedComment: {},
        });
      }
    } else {
      this.onSubmit();
    }
  }

  deleteComment = (deletedComment) => {
    this.setState(
      { deletedComment },
      () => {
        this.setState({ snackOpen: true });
        this.timeout = setTimeout(() => {
          this.delete(deletedComment);
          this.setState(
            { snackOpen: false },
            () => {
              setTimeout(() => {
                this.setState({
                  deletedComment: { },
                  selectedComment: { name: '', content: '' },
                });
              }, 1000);
            },
          );
        }, 5000);
      },
    );
  }

  editComment = (comment) => {
    this.handleClose();
    this.setState({
      comment,
      editMode: true,
    });
  }

  handleClick = ({ event, selectedComment }) => {
    this.setState({
      selectedComment,
      anchorEl: event.currentTarget,
    });
  };

  selectComment = ({ menuItem }) => {
    const { selectedComment: comment } = this.state;
    const actions = {
      Edit: () => this.editComment(comment),
      Delete: () => this.deleteComment(comment),
    };
    actions[menuItem]();
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

BaseClass.propTypes = propTypes;

export default BaseClass;
