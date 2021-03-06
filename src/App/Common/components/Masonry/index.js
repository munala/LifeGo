/* eslint-disable react/no-unused-state */
import React from 'react';
import MediaQuery from 'react-responsive';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import BaseClass from './BaseClass';
import SnackBarComponent from '../SnackBarComponent';
import Fab from '../Fab';
import Form from '../Form';
import Card from '../Card';
import Loading from './Loading';
import EmptyState from './EmptyState';
import propTypes from './propTypes';
import './styles.css';

class Masonry extends BaseClass {
  static getDerivedStateFromProps = ({
    data: { bucketlists },
  }, state) => {
    if (state.bucketlist && state.deleting) {
      return ({
        ...state,
        bucketlists: bucketlists.filter(buck => buck.id !== state.bucketlist.id),
      });
    }

    return ({
      ...state,
      bucketlists,
    });
  }

  componentDidMount = () => {
    const {
      data: { bucketlists },
      location: { pathname },
      actions: {
        explore,
        loadAllBucketlists,
      },
    } = this.props;
    if (bucketlists.length === 0) {
      const actions = {
        '/': loadAllBucketlists,
        '/home': loadAllBucketlists,
        '/explore': explore,
      };
      const action = actions[pathname];
      if (action) {
        action();
        return;
      }
      if (pathname.includes('/home')) {
        loadAllBucketlists();
      }
    }
  }

  renderCards = ({ columnCount, currentApiCalls }) => { // eslint-disable-line react/prop-types
    const { bucketlists: bucks, mode } = this.state;
    const {
      profile, actions,
    } = this.props;

    const cols = bucks.length <= columnCount ? bucks.length : columnCount;

    const { reorderd: bucketlists } = this.reorder(bucks, cols);

    if (currentApiCalls > 0) {
      return <Loading columnCount={columnCount} />;
    }

    return (
      <div
        className="masonry-grid"
        style={{ columnCount, overflow: 'scroll' }}
        onScroll={this.onScroll}
      >
        {bucketlists.map(bucketlist => (
          <Card
            key={bucketlist.id}
            profile={profile}
            bucketlist={bucketlist}
            modal={false}
            mode={mode}
            selected={false}
            actions={actions}
            selectBucketlist={this.selectBucketlist}
            openModal={this.openModal}
            deleteBucketlist={this.deleteBucketlist}
          />
      ))}
      </div>
    );
  }

  render() {
    const {
      selectedBucketlist,
      mode,
      showAddModal,
      bucketlist: buck,
      snackOpen,
      saving,
      message,
      bucketlists: stateBucketlists,
    } = this.state;

    const {
      profile,
      actions,
      location: { pathname },
      data: { bucketlists, newBucketlists: { length: totalNew } },
      currentApiCalls,
      fromProfile,
      documentTitle,
    } = this.props;

    const bucketList = {
      ...buck,
      privacy: buck ? (buck.privacy || profile.privacy || 'friends') : (profile.privacy || 'friends'),
    };

    const [bucketlist] = bucketlists.filter(list => list.id === selectedBucketlist.id);

    return (
      <DocumentTitle title={fromProfile ? documentTitle : `${pathname.substr(1, 1).toUpperCase()}${pathname.substr(2, pathname.length)}`}>
        <div className="stack-grid">
          {
            totalNew > 0 &&
            <div
              className="load-more-indicator"
              onClick={actions.loadMore}
            >
              {`${totalNew > 9 ? `${totalNew}+` : totalNew} new post${totalNew === 1 ? '' : 's'}`}
            </div>
          }
          <MediaQuery query="(min-width: 1825px)">
            {this.renderCards({ columnCount: 5, currentApiCalls })}
          </MediaQuery>
          <MediaQuery query="(max-width: 1824px)">
            <MediaQuery query="(min-width: 1225px)">
              {this.renderCards({ columnCount: 4, currentApiCalls })}
            </MediaQuery>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <MediaQuery query="(min-width: 1025px)">
              {this.renderCards({ columnCount: 3, currentApiCalls })}
            </MediaQuery>
          </MediaQuery>
          <MediaQuery query="(max-width: 1024px)">
            <MediaQuery query="(min-width: 481px)">
              {this.renderCards({ columnCount: 2, currentApiCalls })}
            </MediaQuery>
          </MediaQuery>
          <MediaQuery query="(max-width: 480px)">
            {this.renderCards({ columnCount: 1, currentApiCalls })}
          </MediaQuery>
          <Modal
            open={!!selectedBucketlist.id}
            onClose={() => this.selectBucketlist(selectedBucketlist)}
          >
            <div className="selected-bucketlist">
              <Card
                profile={profile}
                bucketlist={bucketlist}
                selected
                modal
                mode={mode}
                actions={actions}
                openModal={this.openModal}
                selectBucketlist={this.selectBucketlist}
                deleteBucketlist={this.deleteBucketlist}
              />
            </div>
          </Modal>
          <Form
            bucketlist={bucketList}
            profile={profile}
            saving={saving}
            open={showAddModal}
            onClose={this.closeModal}
            save={this.save}
          />
          {
          currentApiCalls === 0 && stateBucketlists.length === 0 && !fromProfile &&
          <EmptyState loggedIn={!!profile.id} pathname={pathname} openModal={this.openModal} />
        }
          {currentApiCalls === 0 && bucketlists.length === 0 && fromProfile && <div />}
          <SnackBarComponent
            open={snackOpen}
            message={message}
            closeSnackBar={message.undo ? this.cancel : this.closeSnackBar}
            undo={message.undo}
          />
          {!!profile.id && pathname !== '/explore' && !fromProfile && <Fab onClick={this.openModal} />}
        </div>
      </DocumentTitle>
    );
  }
}

Masonry.propTypes = propTypes;

export default withRouter(Masonry);
