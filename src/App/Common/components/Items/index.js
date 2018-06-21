import React from 'react';

import NewInput from '../NewInput';
import CheckBox from '../CheckBox';
import BaseClass from './BaseClass';
import propTypes from './propTypes';
import './styles.css';

class Items extends BaseClass {
  state = {
    page: 0,
    item: {
      name: '',
    },
    selectedItem: {
      id: '',
      content: '',
    },
    typing: false,
    submitting: false,
    editMode: false,
  }

  renderItems = bucketlist => bucketlist.items
    .slice(this.state.page * 5, (this.state.page * 5) + 5)
    .map(item => (
      <div key={item.id} className="item-container">
        <div className="item-name">{item.name}</div>
        <CheckBox
          checked={item.done}
          onChange={() => this.onDone(item)}
          disabled={this.props.bucketlist.userId !== this.props.profile.id}
        />
      </div>
    ))

  render = () => {
    const { bucketlist } = this.props;
    const {
      page, editMode, submitting, item,
    } = this.state;

    return (
      <div className="items-container">
        {
          this.props.bucketlist.userId === this.props.profile.id && this.props.mode &&
          <NewInput
            content={{
              ...item,
              content: item.name,
              type: 'name',
            }}
            onChange={this.onChange}
            save={this.onSave}
            submitting={submitting}
            buttonLabel={editMode ? 'save' : 'add'}
          />
        }

        {this.renderItems(bucketlist)}

        <div className="items-nav-buttons">
          {
            bucketlist.items.length > 0 && page > 0 &&
            <a href="#" onClick={() => this.navigatePage('previous')}>previous</a>
          }
          {
            bucketlist.items.length > 0 && bucketlist.items.length > ((page + 1) * 5) &&
            <a href="#" onClick={() => this.navigatePage('next')}>next</a>
          }
        </div>
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
