import createStore from '../configureStore';
import createStoreDev from '../configureStore.dev';

describe('Store', () => {
  it('Should getState in dev', () => {
    expect(JSON.stringify(createStore({}))).toEqual(JSON.stringify(createStoreDev({})));
  });
});
