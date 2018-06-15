// @flow
import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';

import configureStore from '../store/configureStore';
import socket from '../socket';

const store = configureStore();

socket(store);

export default () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);
