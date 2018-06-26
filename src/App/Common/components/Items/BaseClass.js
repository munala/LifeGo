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
      this.setState({
        item: {
          name: '',
        },
        editMode: false,
      });
    }
  }

  navigatePage = (direction) => {
    this.setState({
      page: this.state.page + (direction === 'next' ? 1 : -1),
    });
  }

  deleteItem = () => {
    const { selectedItem: deletedItem } = this.state;

    this.setState(
      { deletedItem },
      () => {
        this.setState({ snackOpen: true });
        this.timeout = setTimeout(() => {
          this.delete(deletedItem);
          this.setState(
            { snackOpen: false },
            () => {
              setTimeout(() => {
                this.setState({
                  deletedItem: { },
                  selectedItem: { name: '' },
                });
              }, 1000);
            },
          );
        }, 5000);
      },
    );
  }

  delete = (item) => {
    this.props.actions.deleteItem(
      this.props.bucketlist,
      item,
    );
  }

  editItem = (item) => {
    this.handleClose();
    this.setState({
      item,
      editMode: true,
    });
  }

  cancel = () => {
    clearTimeout(this.timeout);
    this.setState({
      item: {},
      deletedItem: { },
      editMode: false,
      snackOpen: false,
    });
  }

  handleClick = ({ event, selectedItem }) => {
    this.setState({
      selectedItem,
      anchorEl: event.currentTarget,
    });
  };

  selectItem = ({ menuItem }) => {
    const { selectedItem: item } = this.state;
    const actions = {
      Edit: () => this.editItem(item),
      Delete: () => this.deleteItem(item),
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
