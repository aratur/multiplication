/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux-store/store';
import ResultsTable from './Results';

const renderResultsTable = () =>
  render(
    <Provider store={store}>
      <ResultsTable />
    </Provider>
  );

beforeEach(() => {
  renderResultsTable();
});

const tableSize = 10;

const cellsHaveProperClassNames = (answersRowCol, className) => {
  let row = 1;
  let col = 0;
  screen.getAllByRole('cell').forEach((cellElement) => {
    const value = Number(cellElement.textContent);
    if (col > 0) expect(value).toBe(row * col);
    if (
      typeof answersRowCol !== 'undefined' &&
      typeof answersRowCol[row] !== 'undefined' &&
      answersRowCol[row] === col
    ) {
      expect(cellElement).toHaveClass(className);
    } else {
      if (col !== 0 && row !== col) expect(cellElement).not.toHaveClass();
      if (row === col) expect(cellElement).toHaveClass('active');
      if (col === 0) expect(cellElement).toHaveClass('info');
    }
    col += 1;
    if (col === tableSize + 1) {
      row += 1;
      col = 0;
    }
  });
};

describe('ResultsTable', () => {
  it('should render table with all values', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader', { name: /[0-9]/ })).toHaveLength(
      tableSize
    );
    expect(screen.getAllByRole('cell', { name: /[0-9]/ })).toHaveLength(
      tableSize * tableSize + tableSize
    );
    cellsHaveProperClassNames(tableSize);
  });
});
