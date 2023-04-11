import React from 'react';
import { screen, render, logDOM } from '@testing-library/react';
import { Provider } from 'react-redux';
import Equation from './Equation';
import store from '../../redux-store/store';

describe('Equation', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Equation xValue={2} yValue={2} correctAnswer={22} />
      </Provider>
    );
    // logDOM();
  });
});
