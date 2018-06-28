/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import propTypes from '../propTypes';

class Header extends Component {
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
