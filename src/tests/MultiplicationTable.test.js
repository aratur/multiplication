import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiplicationTable from '../MultiplicationTable';

const renderMultiplicationTable = () => render(<MultiplicationTable />);

describe('MultiplicationTable', () => {
  it('should render WarningAlert if to few results', () => {
    renderMultiplicationTable();
    // screen.debug();
    expect(screen.getAllByRole('checkbox')).toHaveLength(10);
  });
});
