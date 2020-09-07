/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RangePicker from '../RangePicker';

const renderRangePicker = (values, callback = () => {}) => render(
  <RangePicker
    rangeValues={values}
    handleOnClick={callback}
  />,
);

describe('RangePicker', () => {
  it('should render all selected values', () => {
    const values = Array(10).fill(true);
    const { getAllByRole } = renderRangePicker(values);
    expect(getAllByRole('checkbox', { checked: true })).toHaveLength(10);
  });

  it('should call parent onClick function which will update its state', () => {
    const onClose = jest.fn();
    const values = Array(10).fill(true);
    const { getByText } = renderRangePicker(values, onClose);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    expect(onClose).toHaveBeenCalledTimes(2);
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
