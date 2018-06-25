import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

import { setLikeColor } from '../../../../../utils';
import '../styles.css';

const ButtonRow = ({
  bucketlist,
  mode,
  profile,
  like,
  toggleItems,
  toggleComments,
}) => (
  <div
    className="bucketlist-button-row"
    style={{ borderBottom: mode ? '1px solid #f7f7f7' : 0 }}
  >
    <div
      onClick={like}
      className="button-length"
    >
      <Icon
        className="icon-color-active"
        style={{ fontSize: 20, color: setLikeColor(bucketlist, profile) }}
      >
        star
      </Icon>
      {
        bucketlist.likes.length > 0 &&
        <div className="counter">
          {bucketlist.likes.length}
        </div>
      }
    </div>
    <div
      onClick={toggleItems}
      className="button-length"
    >
      <Icon
        className="icon-color"
        style={{ fontSize: 20 }}
      >
        list
      </Icon>
      {
        bucketlist.items.length > 0 &&
        <div className="counter">
          {bucketlist.items.length}
        </div>
      }
    </div>
    <div
      onClick={toggleComments}
      className="button-length"
    >
      <Icon
        className="icon-color"
        style={{ fontSize: 20 }}
      >
        comment
      </Icon>
      {
        bucketlist.comments.length > 0 &&
        <div className="counter">
          {bucketlist.comments.length}
        </div>
      }
    </div>
  </div>
);

ButtonRow.propTypes = {
  bucketlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  mode: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  like: PropTypes.func.isRequired,
  toggleItems: PropTypes.func.isRequired,
  toggleComments: PropTypes.func.isRequired,
};

export default ButtonRow;
