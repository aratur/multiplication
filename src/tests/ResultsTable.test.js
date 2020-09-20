import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../redux-store/store';
import ResultsTable from '../ResultsTable';
import { resultStatus, setValueAtRowCol } from '../redux-store/resultsSlice';

const renderResultsTable = () => render(
  <Provider store={store}><ResultsTable /></Provider>,
);

const tableSize = 10;
const getSuccessButton = () => screen.getByRole('button', { name: /poprawne/i });
const getIncorrectButton = () => screen.getByRole('button', { name: /błędne/i });
const getRemoveHistoryButton = () => screen.getByRole('button', { name: /usuń wyniki/i });

const cellsHaveProperClassNames = (answersRowCol, className) => {
  let row = 1;
  let col = 0;
  screen.getAllByRole('cell')
    .forEach((cellElement) => {
      const value = Number(cellElement.textContent);
      if (col > 0) expect(value).toBe(row * col);
      if (typeof answersRowCol !== 'undefined'
        && typeof answersRowCol[row] !== 'undefined'
        && answersRowCol[row] === col) {
        // console.log(row, col, cellElement.className);
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

const setStatusDurationAtRowCol = (status, duration, row, col) => {
  const answerState = { status, duration };
  const payload = { answerState, xValue: row, yValue: col };
  store.dispatch(setValueAtRowCol(payload));
};

const dispatchStoreChanges = () => {
  setStatusDurationAtRowCol(resultStatus.failure, 10, 1, 1);
  setStatusDurationAtRowCol(resultStatus.success, 15, 2, 2);
  setStatusDurationAtRowCol(resultStatus.failure, 16, 2, 3);
  setStatusDurationAtRowCol(resultStatus.success, 10, 3, 3);
};
const correctAnswersRowCol = { 2: 2, 3: 3 };
const incorrectAnswersRowCol = { 1: 1, 2: 3 };

describe('ResultsTable', () => {
  it('should render table with all values', () => {
    renderResultsTable();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader', { name: /[0-9]/ }))
      .toHaveLength(tableSize);
    expect(screen.getAllByRole('cell', { name: /[0-9]/ }))
      .toHaveLength(tableSize * tableSize + tableSize);
    cellsHaveProperClassNames(tableSize);
  });
  it('show and hide correct answers', () => {
    renderResultsTable();
    dispatchStoreChanges();
    cellsHaveProperClassNames();
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(correctAnswersRowCol, 'success');
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(tableSize);
  });
  it('show and hide incorrect answers', () => {
    renderResultsTable();
    dispatchStoreChanges();
    userEvent.click(getIncorrectButton());
    cellsHaveProperClassNames(incorrectAnswersRowCol, 'danger');
    userEvent.click(getIncorrectButton());
    cellsHaveProperClassNames(tableSize);
  });
  it('show only either success or incorrect answers', () => {
    renderResultsTable();
    dispatchStoreChanges();
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(correctAnswersRowCol, 'success');
    userEvent.click(getIncorrectButton());
    cellsHaveProperClassNames(incorrectAnswersRowCol, 'danger');
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(correctAnswersRowCol, 'success');
  });
  it('clear saved results', () => {
    renderResultsTable();
    dispatchStoreChanges();
    userEvent.click(getRemoveHistoryButton());
    cellsHaveProperClassNames();
    userEvent.click(getIncorrectButton());
    cellsHaveProperClassNames();
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames();
  });
});
