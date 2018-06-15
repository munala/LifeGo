import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';
import getEnv from './getEnv';

export default (getEnv() === 'production'
  ? configureStoreProd
  : configureStoreDev);
