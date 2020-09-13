import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsTable from '../ResultsTable';
import { resultStatus, results } from '../model/results';

const renderResultsTable = (resultsArray, size) => render(
  <ResultsTable
    resultsArray={resultsArray}
    size={size}
  />,
);

describe('ResultsTable', () => {
  it('should render with defaultProps', () => {
    renderResultsTable(results(10), 10);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('should render with defaultProps', () => {
    renderResultsTable(results(10), 10);
    expect(screen.getByText(/wyniki/i)).toBeInTheDocument();
  });
});
