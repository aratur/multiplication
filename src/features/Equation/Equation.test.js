import React from 'react';
import ReactDOM from 'react-dom/client';
import pretty from 'pretty';
import { Provider } from 'react-redux';
import Equation from './Equation';
import store from '../../redux-store/store';

describe('Equation', () => {
  it('should render correctly', () => {
    ReactDOM.createRoot(document.createElement('div')).render(
      <Provider store={store}>
        <Equation xValue={2} yValue={2} correctAnswer={22} />
      </Provider>
    );
    const container = document.createElement('div');
  });
});
