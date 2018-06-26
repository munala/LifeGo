import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Comments from '../../Comments';
import Items from '../../Items';
import CardHeader from '../CardHeader';
import ButtonRow from '../ButtonRow';
import { setTime } from '../../../../../utils';
import '../styles.css';

class Card extends Component {
  state = {
    mode: this.props.modal ? this.props.mode : '',
    liking: false,
  }

  goToProfile = () => {
    const { bucketlist, history } = this.props;
    history.push(`profile/${bucketlist.id}`);
  }

  like = async () => {
    const { bucketlist, profile } = this.props;

    let liked = false;

    if (!this.state.liking) {
      this.setState(() => ({ liking: true }));
      if (bucketlist.likes) {
        let singleLike;
        liked = bucketlist.likes.some((like) => {
          const userLiked = like.likerId === profile.id;
          if (userLiked) {
            singleLike = like;
          }
          return userLiked;
        });
        if (liked) {
          await this.props.actions.unlike(singleLike);
        }
        this.setState(() => ({ liking: false }));
      }
      if (!liked) {
        await this.props.actions.like(bucketlist);
        this.setState(() => ({ liking: false }));
      }
    }
  }

  toggleComments = () => {
    const { selected, selectBucketlist, bucketlist } = this.props;

    if (!selected) {
      selectBucketlist(bucketlist, 'comments');
    } else {
      this.setState({
        mode: this.state.mode === 'comments' ? '' : 'comments',
      });
    }
  }

  toggleItems = () => {
    const { selected, selectBucketlist, bucketlist } = this.props;

    if (!selected) {
      selectBucketlist(bucketlist, 'items');
    } else {
      this.setState({
        mode: this.state.mode === 'items' ? '' : 'items',
      });
    }
  }

  render() {
    const {
      profile,
      bucketlist,
      actions,
      selected,
      selectBucketlist,
      modal,
      location: { pathname },
      deleteBucketlist,
      openModal,
    } = this.props;
    const { mode } = this.state;

    const { createdAt, time } = setTime(bucketlist);

    return (
      <div
        key={bucketlist.id}
        className="card"
      >
        <div onClick={
            selected ?
            () => {} :
            () => selectBucketlist(bucketlist)
          }
        >
          <CardHeader
            bucketlist={bucketlist}
            createdAt={createdAt}
            modal={modal}
            time={time}
            pathname={pathname}
            profile={profile}
            deleteBucketlist={deleteBucketlist}
            openModal={openModal}
            selectBucketlist={selectBucketlist}
            goToProfile={this.goToProfile}
          />
          <div className="bucketlist-name">{ bucketlist.name }</div>
          {
            bucketlist.description &&
            <div className="bucketlist-description">{ bucketlist.description }</div>
          }
          {
            bucketlist.pictureUrl &&
            <img
              src={bucketlist.pictureUrl}
              className="bucketlist-pic"
              alt={bucketlist.name}
            />
          }
        </div>
        {
          profile.id &&
          <ButtonRow
            bucketlist={bucketlist}
            mode={mode}
            profile={profile}
            like={this.like}
            toggleItems={this.toggleItems}
            toggleComments={this.toggleComments}
          />
        }
        {
          profile.id && mode === 'comments' &&
          <div className="bottom-section">
            <Comments
              profile={this.props.profile}
              bucketlist={bucketlist}
              mode="single"
              actions={actions}
              goToProfile={this.goToProfile}
            />
          </div>
        }
        {
          profile.id && mode === 'items' &&
          <div className="bottom-section">
            <Items
              profile={this.props.profile}
              bucketlist={bucketlist}
              mode="single"
              actions={actions}
            />
          </div>
        }
      </div>
    );
  }
}

Card.propTypes = {
  selected: PropTypes.bool.isRequired,
  selectBucketlist: PropTypes.func.isRequired,
  bucketlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  modal: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    deleteBucketlist: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  deleteBucketlist: PropTypes.func.isRequired,
};

export default withRouter(Card);
