import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import jwtDecode from 'jwt-decode';

import configureStore from '../store/configureStore';
import { loginSuccess } from './Auth/actions';
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

const token = localStorage.getItem('token');

if (token && jwtDecode(token).exp >= Date.now() / 1000) {
  store.dispatch(loginSuccess({ loggedIn: true }));
  socket(store);
}

export default () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>
);
