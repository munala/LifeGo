/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  openModal = (bucketlist) => {
    this.setState(
      { bucketlist },
      () => {
        this.setState({
          showAddModal: true,
        });
      },
    );
  }

  closeModal = () => {
    this.setState({
      showAddModal: false,
    });
  }

  closeSnackBar = () => {
    this.setState({
      snackOpen: false,
      message: {},
    });
  }

  deleteBucketlist = (bucketlist) => {
    const { actions: { deleteBucketlist } } = this.props;
    this.setState(
      {
        bucketlist,
        deleting: true,
      },
      () => {
        this.setState({
          snackOpen: true,
          message: {
            content: `You have deleted ${this.state.bucketlist && this.state.bucketlist.name}`,
            success: true,
            undo: 'undo',
          },
        });
        this.selectBucketlist(bucketlist);
        this.timeout = setTimeout(async () => {
          await deleteBucketlist(bucketlist);
          this.setState(
            { snackOpen: false },
            () => {
              setTimeout(() => {
                this.setState({
                  bucketlist: undefined,
                  deleting: true,
                });
              }, 1000);
            },
          );
        }, 5000);
      },
    );
  }

  cancel = () => {
    this.setState({
      snackOpen: false,
      bucketlist: undefined,
      deleting: false,
      bucketlists: this.props.data.bucketlists,
    });
    clearTimeout(this.timeout);
  }

  save = async (buck) => {
    const { actions: { updateBucketlist, saveBucketlist } } = this.props;
    const bucketlist = {
      ...buck,
      dueDate: buck.dueDate || null,
    };

    this.setState({ saving: true });

    const action = this.state.bucketlist.id ? updateBucketlist : saveBucketlist;

    const { error } = await action(bucketlist);

    this.setState({ saving: false });

    if (!error) {
      this.closeModal();
    } else {
      this.setState({
        snackOpen: true,
        message: {
          content: error,
          success: false,
        },
      });
    }
  }

  selectBucketlist = (bucketlist, mode) => {
    const { selectedBucketlist } = this.state;
    const { match: { params: { id } }, history: { goBack } } = this.props;

    if (id && selectedBucketlist.id) {
      goBack();
    }

    this.setState({
      mode: mode || '',
      selectedBucketlist: bucketlist.id !== selectedBucketlist.id ? bucketlist : {},
    });
  }

  reorder = (bucketlists, columns) => {
    let reorderd = [];

    for (let col = 0; col < columns; col += 1) {
      const columnArray = [];
      for (let i = 0; i < bucketlists.length; i += columns) {
        const val = bucketlists[i + col];

        if (val) {
          columnArray.push(val);
        }
      }
      reorderd = reorderd.concat(columnArray);
    }
    return ({
      reorderd,
    });
  };
}

BaseClass.propTypes = propTypes;

export default BaseClass;
