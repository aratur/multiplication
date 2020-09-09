/* eslint-env jest */
import React from 'react';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RangePicker from '../RangePicker';

const renderRangePicker = (
  values, minimumNoOfSelectedValues = 3, callback = () => {},
) => render(
  <RangePicker
    rangeValues={values}
    setNewRangeValueAt={callback}
    minimumNoOfSelectedValues={minimumNoOfSelectedValues}
  />,
);

describe('RangePicker', () => {
  it('should render all selected values', () => {
    const values = Array(10).fill(true);
    const { getAllByRole } = renderRangePicker(values);
    expect(getAllByRole('checkbox', { checked: true })).toHaveLength(10);
  });

  it('should call parent setNewRangeValueAt after clicking on a button', () => {
    const setNewRangeValueAt = jest.fn();
    const values = Array(10).fill(true);
    const { getByText } = renderRangePicker(values, 3, setNewRangeValueAt);
    userEvent.click(screen.getByRole('checkbox', { name: '1' }));
    expect(setNewRangeValueAt).toHaveBeenCalledWith(false, 0);
    fireEvent.click(getByText('2'));
    expect(setNewRangeValueAt).toHaveBeenCalledTimes(2);
  });

  it('should display warning after to few options are selected', async () => {
    const values = Array(10).fill(true);
    const setNewRangeValueAt = jest.fn();
    renderRangePicker(values, 10, setNewRangeValueAt);
    userEvent.click(screen.getByRole('checkbox', { name: '1' }));
    await screen.findByText('Nie tak szybko');
    expect(setNewRangeValueAt).not.toHaveBeenCalled();
  });

  it('should hide warning after clicking X', async () => {
    const values = Array(10).fill(true);
    const setNewRangeValueAt = jest.fn();
    renderRangePicker(values, 10, setNewRangeValueAt);
    userEvent.click(screen.getByRole('checkbox', { name: '1' }));
    await screen.findByText('Nie tak szybko');
    userEvent.click(screen.getByRole('button', { name: 'close alert' }));
    expect(screen.queryByText('Nie tak szybko')).not.toBeInTheDocument();
  });

  it('should have proper class based on received array', () => {
    const values = [true, false, false, true];
    const { getAllByRole } = renderRangePicker(values);
    getAllByRole('checkbox').forEach((x) => {
      if (x.getAttribute('aria-checked') === 'true') {
        expect(x).toHaveAttribute('class', 'btn btn-success');
      } else {
        expect(x).toHaveAttribute('class', 'btn btn-info');
      }
    });
  });
});
