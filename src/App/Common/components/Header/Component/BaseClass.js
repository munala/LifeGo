/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import propTypes from './propTypes';

class Header extends Component {
  onChange = ({ target: { value: searchText } }) => {
    this.setState({ searchText });
    this.props.actions.searchUsers(searchText);
  }

  onSelect = async (id) => {
    const {
      history: { push },
    } = this.props;

    this.setState({ searchText: '' });
    push(`/profile/${id}`);
  }

  viewAll = async () => {
    const {
      history: { push },
    } = this.props;

    this.setState({ searchText: '' });
    push(`/search?q=${this.state.searchText}`);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  selectPanel = ({ event, panel }) => {
    const { selectedPanel } = this.state;
    this.setState({
      selectedPanel: selectedPanel === panel ? '' : panel,
      topAnchor: event.currentTarget,
    });
  }

  logout = () => {
    this.setState({ anchorEl: null });
    this.props.actions.logout();
    this.props.history.push({
      pathname: '/login',
      state: { login: true },
    });
  };
}

Header.propTypes = propTypes;

export default Header;
