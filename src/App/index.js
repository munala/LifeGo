// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';

import configureStore from '../store/configureStore';
import socket from '../socket';
import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[500] },
    secondary: { main: '#f7f7f7' },
    action: '#fff',
  },
});

const store = configureStore();

socket(store);

export default () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>
);
