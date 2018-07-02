import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

import Form from '../Common/components/Form';
import Dialog from '../Common/components/Dialog';
import Card from '../Common/components/Card';
import './styles.css';

class SingleList extends Component {
  state = {
    error: '',
    showEditModal: false,
    showDialog: false,
  }

  componentDidMount = () => {
    this.getBucketlist();
  }

  getBucketlist = async () => {
    const { match: { params: { id } } } = this.props;
    const { error } = await this.props.actions.getBucketlist(id);
    this.setState({ error });
  }

  openModal = () => {
    this.setState({
      showEditModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      showEditModal: false,
    });
  }

  deleteBucketlist = () => {
    this.setState({ showDialog: true });
  }

  delete = async () => {
    const { bucketlist, actions: { deleteBucketlist }, history: { goBack } } = this.props;
    const { error } = await deleteBucketlist(bucketlist);
    if (!error) {
      goBack();
    }
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
    });
  }

  save = async (buck) => {
    const bucketlist = {
      ...buck,
      dueDate: buck.dueDate || null,
    };

    const { actions: { updateBucketlist } } = this.props;


    const { error } = await updateBucketlist(bucketlist);

    if (!error) {
      this.closeModal();
    }
  }

  render() {
    const {
      history, profile, bucketlist, actions,
    } = this.props;

    const { error, showEditModal, showDialog } = this.state;

    return (
      <Modal
        open
        onClose={history.goBack}
      >
        <div className="single-container">
          {
            showDialog &&
            <Dialog
              type="conversation"
              message="Are you sure you want to delete this bucketlist?"
              onConfirm={this.delete}
              onCancel={this.closeDialog}
            />
          }
          {
            !bucketlist.id && !error &&
            <div className="select-bucketlist">
              <div className="loading-item">
                <div className="loading-header">
                  <div className="loading-avatar" />
                  <div className="loading-details">
                    <div className="loading-detail" style={{ width: 200 }} />
                    <div className="loading-detail" style={{ width: 150 }} />
                  </div>
                </div>
                <div className="loading-body-details">
                  <div className="loading-body-detail" style={{ width: 300 }} />
                  <div className="loading-body-detail" style={{ width: 200 }} />
                </div>
                <div className="loading-image" />
              </div>
            </div>
          }
          {
            error &&
            <div className="select-bucketlist">
              <i className="material-icons error-icon">error_outline</i>
              <div className="no-bucketlist">
                Oops! We could not find that bucketlist.
              </div>
            </div>
          }
          {
            bucketlist.id &&
            <Card
              profile={profile}
              bucketlist={bucketlist}
              selected
              modal
              mode="comments"
              actions={actions}
              openModal={this.openModal}
              selectBucketlist={() => {}}
              deleteBucketlist={this.deleteBucketlist}
            />
          }
          <Form
            bucketlist={bucketlist}
            open={showEditModal}
            onClose={this.closeModal}
            save={this.save}
          />
        </div>
      </Modal>
    );
  }
}

SingleList.propTypes = {
  actions: PropTypes.shape({
    getBucketlist: PropTypes.func.isRequired,
  }).isRequired,
  bucketlist: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
};

export default SingleList;
