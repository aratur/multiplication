import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsTable from '../ResultsTable';
import { resultStatus, results } from '../model/results';

const renderResultsTable = (resultsData, size) => render(
  <ResultsTable
    resultsData={resultsData}
    size={size}
  />,
);

const getSuccessButton = () => screen.getByRole('button', { name: /poprawne/i });
const getIncorrectButton = () => screen.getByRole('button', { name: /błędne/i });
const getSlowestButton = () => screen.getByRole('button', { name: /najwolniejsze/i });

const getResultsData = (size) => {
  let resultsData = results(size);
  if (size < 3) console.error('Expected size >= 3.');
  resultsData = resultsData
    .setValueAtRowCol({ status: resultStatus.failure, duration: 4 }, 1, 1);
  resultsData = resultsData
    .setValueAtRowCol({ status: resultStatus.success, duration: 1 }, 2, 2);
  resultsData = resultsData
    .setValueAtRowCol({ status: resultStatus.failure, duration: 7 }, 2, 3);
  resultsData = resultsData
    .setValueAtRowCol({ status: resultStatus.success, duration: 5 }, 3, 3);
  return resultsData;
};

const cellsHaveProperClassNames = (tableSize, answersRowCol, className) => {
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

describe('ResultsTable', () => {
  it('should render table with all values', () => {
    const size = 5;
    renderResultsTable(results(size), size);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader', { name: /[0-9]/ }))
      .toHaveLength(size);
    expect(screen.getAllByRole('cell', { name: /[0-9]/ }))
      .toHaveLength(size * size + size);
    cellsHaveProperClassNames(size);
  });
  it('render failed message when resultsData is smaller that table size', () => {
    const tableSize = 3;
    renderResultsTable(results(2), tableSize);
    expect(screen.getByText(/failed to render/i)).toBeInTheDocument();
  });
  it('show and hide correct answers', () => {
    const tableSize = 3;
    const correctAnswersRowCol = { 2: 2, 3: 3 };
    const resultsData = getResultsData(tableSize);
    renderResultsTable(resultsData, tableSize);
    cellsHaveProperClassNames(tableSize);
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(tableSize, correctAnswersRowCol, 'success');
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(tableSize);
  });
  it('show and hide incorrect answers', () => {
    const tableSize = 3;
    const incorrectAnswersRowCol = { 1: 1, 2: 3 };
    const resultsData = getResultsData(tableSize);
    renderResultsTable(resultsData, tableSize);
    userEvent.click(getIncorrectButton());
    cellsHaveProperClassNames(tableSize, incorrectAnswersRowCol, 'danger');
    userEvent.click(getIncorrectButton());
    cellsHaveProperClassNames(tableSize);
  });
  it('show and hide slowest answers', () => {
    const tableSize = 3;
    const slowestAnswersRowCol = { 1: 1, 2: 3, 3: 3 };
    const resultsData = getResultsData(tableSize);
    renderResultsTable(resultsData, tableSize);
    userEvent.click(getSlowestButton());
    cellsHaveProperClassNames(tableSize, slowestAnswersRowCol, 'warning');
    userEvent.click(getSlowestButton());
    cellsHaveProperClassNames(tableSize);
  });
  it('show only either success slowest or incorrect answers', () => {
    const tableSize = 3;
    const correctAnswersRowCol = { 2: 2, 3: 3 };
    const incorrectAnswersRowCol = { 1: 1, 2: 3 };
    const slowestAnswersRowCol = { 1: 1, 2: 3, 3: 3 };
    const resultsData = getResultsData(tableSize);
    renderResultsTable(resultsData, tableSize);
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(tableSize, correctAnswersRowCol, 'success');
    userEvent.click(getIncorrectButton());
    cellsHaveProperClassNames(tableSize, incorrectAnswersRowCol, 'danger');
    userEvent.click(getSlowestButton());
    cellsHaveProperClassNames(tableSize, slowestAnswersRowCol, 'warning');
    userEvent.click(getSuccessButton());
    cellsHaveProperClassNames(tableSize, correctAnswersRowCol, 'success');
  });
});