import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  resultStatus, setValueAtRowCol,
} from '../redux-store/resultsSlice';
import store from '../redux-store/store';
import Gems from '../components/Gems';

const setStatusDurationAtRowCol = (status, duration, row, col) => {
  const answerState = { status, duration };
  const payload = { answerState, xValue: row, yValue: col };
  store.dispatch(setValueAtRowCol(payload));
};

const renderGems = () => render(<Provider store={store}><Gems /></Provider>);

describe('Gems', () => {
  it('should not display gems if table was not solved', () => {
    renderGems();
    expect(screen.queryByRole('img', 'gem')).toBe(null);
  });
  it('should display one gem after table was solved once', () => {
    const defaultSize = 10;
    const iterate = Array(defaultSize).fill(1).map((value, index) => index + 1);
    iterate.forEach((a) => {
      iterate.forEach((b) => {
        setStatusDurationAtRowCol(
          resultStatus.success, 100, a, b,
        );
      });
    });
    renderGems();
    expect(screen.getAllByRole('img', 'gem')).toHaveLength(1);
  });
});
