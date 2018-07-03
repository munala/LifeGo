/* eslint-disable react/no-unused-state */
import React from 'react';
import MediaQuery from 'react-responsive';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';

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
  state = {
    bucketlists: [],
    bucketlist: {},
    selectedBucketlist: {},
    mode: '',
    showAddModal: false,
    snackOpen: false,
    deleting: false,
  }

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

  onScroll = ({ target }) => {
    const bottomReached = (target.scrollHeight - target.scrollTop) === target.clientHeight;

    if (bottomReached) {
      const {
        data: { nextUrl, bucketlists: { length } },
        actions: { loadMoreBucketlists },
        location: { pathname },
      } = this.props;

      const dataTypes = {
        '/': 'allData',
        '/home': 'allData',
        '/mylists': 'myData',
      };

      const dataType = dataTypes[pathname];

      if (nextUrl && dataType) {
        const offset = Math.ceil(length / 50) * 50;
        loadMoreBucketlists(dataType, offset);
      }
    }
  }

  renderCards = ({ columnCount, currentApiCalls }) => { // eslint-disable-line react/prop-types
    const { bucketlists: bucks, mode } = this.state;
    const { profile, actions } = this.props;

    const cols = bucks.length <= columnCount ? bucks.length : columnCount;

    const { reorderd: bucketlists } = this.reorder(bucks, cols);

    if (currentApiCalls > 0) {
      return <Loading columnCount={columnCount} />;
    }

    return (
      <div style={{ columnCount, overflow: 'scroll' }}>
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
      selectedBucketlist, mode, showAddModal, bucketlist: bucketList, snackOpen,
    } = this.state;

    const {
      profile,
      actions,
      data: { bucketlists, newBucketlists: { length: totalNew } },
      location: { pathname },
      currentApiCalls,
      fromProfile,
    } = this.props;

    const [bucketlist] = bucketlists.filter(buck => buck.id === selectedBucketlist.id);

    return (
      <div className="stack-grid" onScroll={this.onScroll}>
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
          open={showAddModal}
          onClose={this.closeModal}
          save={this.save}
        />
        {pathname !== '/explore' && !fromProfile && <Fab onClick={this.openModal} />}
        {currentApiCalls === 0 && bucketlists.length === 0 &&
          <EmptyState fromProfile={fromProfile} />}
        <SnackBarComponent
          open={snackOpen}
          message={{
            content: `You have deleted ${bucketList && bucketList.name}`,
            success: true,
          }}
          closeSnackBar={this.cancel}
          undo="undo"
        />
      </div>
    );
  }
}

Masonry.propTypes = propTypes;

export default withRouter(Masonry);
