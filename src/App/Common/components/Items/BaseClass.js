/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  onChange = ({ target: { value } }) => {
    this.setState({
      item: {
        ...this.state.item,
        name: value,
      },
    });
  }

  onDone = (item) => {
    const newItem = { ...item, done: !item.done };
    this.props.actions.updateItem(
      this.props.bucketlist,
      newItem,
    );
  }

  onSave = async () => {
    const { actions, bucketlist } = this.props;
    const { item, editMode } = this.state;
    let response;

    if (editMode) {
      response = await actions.updateItem(bucketlist, { ...item });
    } else {
      response = await actions.saveItem(bucketlist, item);
    }

    if (!response.error) {
      // TODO
    }
  }

  navigatePage = (direction) => {
    this.setState({
      page: this.state.page + (direction === 'next' ? 1 : -1),
    });
  }

  deleteItem = () => {
    this.closeMenu();
    this.props.openDialog();
  }

  delete = () => {
    this.props.closeDialog();
    this.props.actions.deleteItem(
      this.props.bucketlist,
      this.state.selectedItem,
    );
  }

  editItem = () => {
    this.closeMenu();
    this.openForm({
      type: 'Edit',
      name: 'item',
    }, this.state.selectedItem);
  }

  cancel = () => {
    this.setState({
      item: {},
      editMode: false,
    });
  }

  openForm = (context, content = {}) => {
    // TODO
  }

  openMenu = (selectedItem) => {
    // TODO
  }

  closeMenu = () => {
    // TODO
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
