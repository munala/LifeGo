import createStore from '../configureStore';
import createStoreProd from '../configureStore.prod';

jest.mock('../getEnv.js', () => () => 'production');
describe('Store', () => {
  it('Should getState in dev', () => {
    expect(JSON.stringify(createStore({}))).toEqual(
      JSON.stringify(createStoreProd({}))
    );
  });
});
