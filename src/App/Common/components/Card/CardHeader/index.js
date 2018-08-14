import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Avatar from '../../Avatar';
import avatar from '../../../../../assets/images/user.png';
import styles from '../styles';
import '../styles.css';

class CardHeader extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  selectItem = (item) => {
    const { openModal, bucketlist, deleteBucketlist } = this.props;
    const actions = {
      Edit: () => openModal(bucketlist),
      Delete: () => deleteBucketlist(bucketlist),
    };
    actions[item]();
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      bucketlist,
      createdAt,
      time,
      goToProfile,
      modal,
      pathname,
      profile,
    } = this.props;

    const { anchorEl } = this.state;

    const menuItems = ['Edit', 'Delete'];

    return (
      <div className="bucketlist-header">
        <Avatar
          className="bucketlist-avatar"
          src={bucketlist.userPictureUrl || avatar}
        />
        <div className="name-time">
          <div className="head-details">
            <div
              onClick={() => goToProfile({ id: bucketlist.userId })}
              className="left-user left-header-content"
            >
              {`${bucketlist.user}\n`}
            </div>
            <div className="bucketlist-time" >
              {`${createdAt}${time}`}
            </div>
          </div>
          <div className="right-details">
            {modal && pathname !== '/explore' && bucketlist.userId === profile.id &&
              <IconButton
                aria-label="More"
                aria-owns={anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon style={styles.darkGrey} />
              </IconButton>
            }
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PaperProps={{ style: styles.menu }}
            >
              {menuItems.map(item => (
                <MenuItem key={item} onClick={() => this.selectItem(item)}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

CardHeader.propTypes = {
  bucketlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  time: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  goToProfile: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  deleteBucketlist: PropTypes.func.isRequired,
};

export default CardHeader;
