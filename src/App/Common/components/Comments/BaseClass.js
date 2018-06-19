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

  deleteComment = () => {
    this.closeMenu();
    this.props.openDialog();
  }

  delete = () => {
    this.props.closeDialog();
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
    this.setState({
      comment: {
        id: '',
        content: '',
      },
      editMode: false,
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

  openMenu = (selectedComment) => {
    // TODO
  }

  closeMenu = () => {
    // TODO
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
