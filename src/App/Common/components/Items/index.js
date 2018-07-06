import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import SnackBarComponent from '../SnackBarComponent';
import NewInput from '../NewInput';
import CheckBox from '../CheckBox';
import BaseClass from './BaseClass';
import propTypes from './propTypes';
import styles from './styles';
import './styles.css';

class Items extends BaseClass {
  state = {
    page: 0,
    item: {
      name: '',
    },
    selectedItem: {
      id: '',
      name: '',
    },
    deletedItem: {},
    typing: false,
    submitting: false,
    editMode: false,
    snackOpen: false,
  }

  renderItems = bucketlist => bucketlist.items
    .filter(item => item.id !== this.state.deletedItem.id)
    .slice(this.state.page * 5, (this.state.page * 5) + 5)
    .map((item) => {
      const menuItems = ['Edit', 'Delete'];

      const { profile } = this.props;
      const {
        anchorEl, selectedItem, snackOpen,
      } = this.state;

      return (
        <div
          key={item.id}
          className="item-container"
        >
          <div className="item-left">
            <div className="item-name">{item.name}</div>
            <CheckBox
              checked={item.done}
              onChange={() => this.onDone(item)}
              disabled={bucketlist.userId !== profile.id}
            />
          </div>
          {
            bucketlist.userId === profile.id && !snackOpen &&
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={event => this.handleClick({ event, selectedItem: item })}
            >
              <MoreVertIcon style={styles.darkGrey} />
            </IconButton>
          }
          {
            selectedItem.id === item.id &&
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PaperProps={{ style: styles.menu }}
            >
              {menuItems.map(menuItem => (
                <MenuItem key={menuItem} onClick={() => this.selectItem({ menuItem })}>
                  {menuItem}
                </MenuItem>
            ))}
            </Menu>
          }
        </div>
      );
    })

  render = () => {
    const { bucketlist, profile, mode } = this.props;
    const {
      page, editMode, submitting, item, snackOpen, deletedItem,
    } = this.state;

    const { length } = bucketlist.items.filter(it => it.id !== deletedItem.id);

    return (
      <div className="items-container">
        <div className="items-nav-buttons">
          {
            bucketlist.items.length > 0 && page > 0 &&
            <a href="#" className="link" onClick={() => this.navigatePage('previous')}>previous</a>
          }
        </div>

        {this.renderItems(bucketlist) }

        <div className="items-nav-buttons">
          {
            length > 0 && length > ((page + 1) * 5) &&
            <a href="#" className="link" onClick={() => this.navigatePage('next')}>next</a>
          }
        </div>

        {
          length === 0 &&
          mode &&
          <div className="empty-text">no items</div>
        }

        {
          bucketlist.userId === profile.id && mode &&
          <NewInput
            content={{
              ...item,
              content: item.name,
              type: 'name',
            }}
            pictureUrl={profile.pictureUrl}
            name="item"
            onChange={this.onChange}
            save={this.onSave}
            submitting={submitting}
            buttonLabel={editMode ? 'save' : 'add'}
          />
        }
        <SnackBarComponent
          open={snackOpen}
          message={{
            content: `You have deleted ${deletedItem && deletedItem.name}`,
            success: true,
          }}
          closeSnackBar={this.cancel}
          undo="undo"
        />
      </div>
    );
  }
}

Items.propTypes = propTypes;

Items.defaultProps = {
  bucket: {
    id: '',
    comments: [],
    items: [],
  },
  mode: null,
};

export default Items;
