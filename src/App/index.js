// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

import configureStore from '../store/configureStore';
import socket from '../socket';
import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[500], contrastText: '#fff' },
    secondary: { main: 'rgba(0,0,0,0)' },
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
